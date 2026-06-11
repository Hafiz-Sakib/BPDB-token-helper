/**
 * Robust BPDB / DESCO / REB prepaid token message parser.
 *
 * Strategy:
 *  1. Locate the token block precisely — the comma-separated list that appears
 *     between "Prepaid Token is" (or "Token is") and the first metadata keyword
 *     (SqNo, Meter No, Vending, etc.).
 *  2. Within that block each comma-delimited segment is stripped to digits; if
 *     exactly 20 digits result → one token.  Groups ≠ 20 digits are dropped
 *     (avoids meter-number / balance contamination).
 *  3. Metadata is extracted from the remainder using tightly-anchored regexes
 *     that will NOT match token digits.
 */

/** Marker keywords that signal the end of the token list */
const META_KEYWORDS = /SqNo|SquNo|Sq\s*No|for\s+offline|Meter\s*No|Vending|Enrg|Total|Demand|VAT|Rebate/i;

export function parseMessage(raw) {
  if (!raw || !raw.trim()) return { tokens: [], meta: null };

  const tokens = extractTokens(raw);
  const meta   = extractMeta(raw);
  return { tokens, meta };
}

/* ─── TOKEN EXTRACTION ──────────────────────────────────────────────────── */

function extractTokens(raw) {
  // Collapse newlines so we can treat the message as one string
  const flat = raw.replace(/\r?\n/g, ' ');

  // Find the start of the token list
  const startMatch = flat.match(/(?:Prepaid\s+Token\s+is|Token\s+is)\s*/i);
  if (!startMatch) return fallbackExtract(raw);

  const afterHeader = flat.slice(startMatch.index + startMatch[0].length);

  // Find where token list ends (first meta keyword or end of string)
  const endMatch = afterHeader.search(META_KEYWORDS);
  const tokenBlock = endMatch === -1 ? afterHeader : afterHeader.slice(0, endMatch);

  return parseTokenBlock(tokenBlock);
}

function parseTokenBlock(block) {
  // Each token is separated by commas; dashes and spaces are formatting only
  const segments = block.split(',');
  const tokens = [];

  for (const seg of segments) {
    const digits = seg.replace(/[^0-9]/g, '');
    if (digits.length === 20) {
      tokens.push(digits);
    }
    // Intentionally ignore segments that are NOT exactly 20 digits
    // (prevents balance numbers, meter numbers, etc. from sneaking in)
  }
  return tokens;
}

/** Last-resort: scan whole message for comma-separated 20-digit groups */
function fallbackExtract(raw) {
  const flat = raw.replace(/\r?\n/g, ' ');
  // Match patterns like XXXX-XXXX-XXXX-XXXX-XXXX (5 groups of 4 digits)
  const pattern = /\b\d{4}[-\s]\d{4}[-\s]\d{4}[-\s]\d{4}[-\s]\d{4}\b/g;
  const matches = flat.match(pattern) || [];
  return matches.map(m => m.replace(/[^0-9]/g, ''));
}

/* ─── METADATA EXTRACTION ───────────────────────────────────────────────── */

function extractMeta(raw) {
  const flat = raw.replace(/\r?\n/g, ' ');
  const meta = {};

  // Meter No — must follow "Meter No:" / "No:" anchored near "offline"
  // The meter number appears after "for offline Meter No:" or standalone "No:"
  const meterMatch = flat.match(/(?:offline\s+Meter\s*\n?\s*No[:\s]+|(?<!\w)No[:\s]+)(\d{8,14})/i);
  if (meterMatch) meta.meterNo = meterMatch[1];

  const vendMatch   = flat.match(/Vending\s*\n?\s*Amt[:\s]+([\d.]+)/i);
  if (vendMatch) meta.vendingAmt = parseFloat(vendMatch[1]);

  const energyMatch = flat.match(/Enrg\s*\n?\s*Cost[:\s]+([\d.]+)/i);
  if (energyMatch) meta.energyCost = parseFloat(energyMatch[1]);

  const totalMatch  = flat.match(/Total\s*\n?\s*Charge[:\s]+([\d.]+)/i);
  if (totalMatch) meta.totalCharge = parseFloat(totalMatch[1]);

  const rentMatch   = flat.match(/Meter\s*\n?\s*Rent\s*\d*P?[:\s]+([\d.]+)/i);
  if (rentMatch) meta.meterRent = parseFloat(rentMatch[1]);

  const demandMatch = flat.match(/Demand\s*\n?\s*Charge[:\s]+([\d.]+)/i);
  if (demandMatch) meta.demandCharge = parseFloat(demandMatch[1]);

  const vatMatch    = flat.match(/VAT[:\s]+([\d.]+)/i);
  if (vatMatch) meta.vat = parseFloat(vatMatch[1]);

  const rebateMatch = flat.match(/Rebate[:\s]+(-?[\d.]+)/i);
  if (rebateMatch) meta.rebate = parseFloat(rebateMatch[1]);

  // Sequence range  e.g. "SqNo:-1~9" or "SquNo:-1~9" or "SqNo:0~9"
  const seqMatch = flat.match(/S(?:qu?)\s*No[:\s]*(-?\d+)\s*[~–-]\s*(-?\d+)/i);
  if (seqMatch) {
    meta.seqStart = parseInt(seqMatch[1]);
    meta.seqEnd   = parseInt(seqMatch[2]);
  }

  return Object.keys(meta).length > 0 ? meta : null;
}

/** Format 20-digit token as XXXX-XXXX-XXXX-XXXX-XXXX */
export function formatToken(digits) {
  return digits.replace(/(.{4})/g, '$1-').slice(0, -1);
}
