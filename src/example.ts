import { MetamaskProvider } from "@0xcert/ethereum-metamask-provider";
import { ValueLedger } from "@0xcert/ethereum-value-ledger";
import { Gateway, ProxyKind } from "@0xcert/ethereum-gateway";
import { config, order } from "./config";

// We create a new instance of metamask provider.
export const provider = new MetamaskProvider(config.providerConfig);

export async function enableMetamask() {
  // We first check if metamask is already enabled.
  if (!(await provider.isEnabled())) {
    // If metamask is not enabled, we enable it.
    return provider.enable();
  }
}

export async function checkApprovedValue() {
  await enableMetamask();
  const valueLedger = new ValueLedger(provider, config.valueLedgerId);
  const gateway = new Gateway(provider);
  const valueTransferProxy = await gateway.getProxyAccountId(
    ProxyKind.TRANSFER_TOKEN
  );
  return valueLedger.isApprovedValue(
    "100000000000000000000",
    config.account1Id,
    valueTransferProxy
  );
}

export async function approveValue() {
  await enableMetamask();
  const valueLedger = new ValueLedger(provider, config.valueLedgerId);
  const gateway = new Gateway(provider);
  const valueTransferProxy = await gateway.getProxyAccountId(
    ProxyKind.TRANSFER_TOKEN
  );
  return valueLedger.approveValue(
    "1000000000000000000000000",
    valueTransferProxy
  );
}

export async function signOrder() {
  await enableMetamask();
  const gateway = new Gateway(provider);
  const signature = await gateway.sign(order).catch(e => {
    throw e;
  });
  config.signature = signature;
}

export async function performOrder() {
  const gateway = new Gateway(provider);
  return gateway.perform(order, config.signature);
}
