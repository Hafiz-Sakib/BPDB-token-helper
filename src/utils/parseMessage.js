/**
 * Parses a BPDB prepaid token SMS / message and extracts:
 *  - tokens: array of 20-digit strings
 *  - meta: { meterNo, vendingAmt, energyCost, totalCharge, meterRent, demandCharge, vat, rebate, seqRange }
 */
export function parseMessage(raw) {
  if (!raw || !raw.trim()) return { tokens: [], meta: null };

  // Strip all whitespace variations, then extract digit groups
  const cleaned = raw.replace(/\s+/g, '');

  // Extract all continuous digit runs
  const allDigits = cleaned.match(/\d+/g) || [];

  // Find 20-digit tokens (may be split by dashes in original)
  // Strategy: extract digit sequences from dash-separated groups
  const tokenSection = extractTokenSection(raw);
  const tokens = tokenSection;

  // Extract metadata
  const meta = extractMeta(raw);

  return { tokens, meta };
}

function extractTokenSection(raw) {
  const tokens = [];

  // Normalize: remove spaces around digits/dashes
  // Match groups of digits separated by dashes that together make 20 digits
  // Pattern: groups like XXXX-XXXX-XXXX-XXXX-XXXX (4+4+4+4+4 = 20)
  // or XXXXXXXXXXXXXXXXXXXXXXXX (20 straight)

  // Remove all whitespace from the raw text first
  const noSpace = raw.replace(/\s+/g, '');

  // Find token block: after "Token is" or "Prepaid Token is"
  // Tokens end before non-token meta info
  let tokenBlock = '';

  // Try to isolate the token list region
  const tokenMatch = noSpace.match(/(?:PrepaidTokenis|Tokenis|token:|tokens:)([0-9,\-]+)/i);
  if (tokenMatch) {
    tokenBlock = tokenMatch[1];
  } else {
    // Try to find a block with comma-separated groups of digits and dashes
    const blockMatch = noSpace.match(/([0-9]{4}-[0-9]{4}-[0-9\s-]{10,}(?:,[0-9\-]+)*)/);
    if (blockMatch) {
      tokenBlock = blockMatch[0];
    }
  }

  if (!tokenBlock) {
    // Fallback: scan entire text for 20-digit sequences
    const digitsOnly = raw.replace(/[^0-9,]/g, ' ');
    tokenBlock = digitsOnly;
  }

  // Split on commas to get individual token strings
  const parts = tokenBlock.split(',');

  for (const part of parts) {
    // Extract only digits from this part
    const digits = part.replace(/[^0-9]/g, '');
    if (digits.length === 20) {
      tokens.push(digits);
    } else if (digits.length > 20) {
      // May contain multiple tokens concatenated
      for (let i = 0; i + 20 <= digits.length; i += 20) {
        tokens.push(digits.slice(i, i + 20));
      }
    }
  }

  return tokens;
}

function extractMeta(raw) {
  const meta = {};

  // Meter No
  const meterMatch = raw.match(/(?:Meter\s*No[:\s.]+)([0-9]+)/i);
  if (meterMatch) meta.meterNo = meterMatch[1];

  // Vending Amount
  const vendMatch = raw.match(/(?:Vending\s*Amt[:\s]+)([0-9.]+)/i);
  if (vendMatch) meta.vendingAmt = parseFloat(vendMatch[1]);

  // Energy Cost
  const energyMatch = raw.match(/(?:Enrg\s*Cost[:\s]+)([0-9.]+)/i);
  if (energyMatch) meta.energyCost = parseFloat(energyMatch[1]);

  // Total Charge
  const totalMatch = raw.match(/(?:Total\s*Charge[:\s]+)([0-9.]+)/i);
  if (totalMatch) meta.totalCharge = parseFloat(totalMatch[1]);

  // Meter Rent
  const rentMatch = raw.match(/(?:Meter\s*Rent\s*\d*P?[:\s]+)([0-9.]+)/i);
  if (rentMatch) meta.meterRent = parseFloat(rentMatch[1]);

  // Demand Charge
  const demandMatch = raw.match(/(?:Demand\s*Charge[:\s]+)([0-9.]+)/i);
  if (demandMatch) meta.demandCharge = parseFloat(demandMatch[1]);

  // VAT
  const vatMatch = raw.match(/(?:VAT[:\s]+)([0-9.]+)/i);
  if (vatMatch) meta.vat = parseFloat(vatMatch[1]);

  // Rebate
  const rebateMatch = raw.match(/(?:Rebate[:\s]+)([-0-9.]+)/i);
  if (rebateMatch) meta.rebate = parseFloat(rebateMatch[1]);

  // Sequence range e.g. "SqNo:-1~9"
  const seqMatch = raw.match(/(?:S(?:q|qu)\s*No[:\s]*)([0-9]+)\s*[~-]\s*([0-9]+)/i);
  if (seqMatch) {
    meta.seqStart = parseInt(seqMatch[1]);
    meta.seqEnd = parseInt(seqMatch[2]);
  }

  return Object.keys(meta).length > 0 ? meta : null;
}

/** Format 20-digit token into XXXX-XXXX-XXXX-XXXX-XXXX */
export function formatToken(digits) {
  return digits.replace(/(.{4})/g, '$1-').slice(0, -1);
}
