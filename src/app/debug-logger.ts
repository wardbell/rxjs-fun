// debug logging
/* Whether to log caching activity to console. For debugging/demos. */
let _verbose = true;
export function getVerbose() { return _verbose; }
export function setVerbose(value: boolean) { _verbose = value; }

// logger logs to console when verbose == true
export function debugLog(...args) {
  if (_verbose) { console.log.apply(null, args); }
}
