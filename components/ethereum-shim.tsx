/* Ethereum ship ensures that the `window.ethereum` object exists to 
 * prevent errors in browsers that do not have it. */

"use client";

import { useEffect } from "react";

export function EthereumShim() {
  useEffect(() => {
    if (typeof window !== "undefined" && !("ethereum" in window)) {
      (window as any).ethereum = { selectedAddress: undefined };
    }
  }, []);

  return null;
}
