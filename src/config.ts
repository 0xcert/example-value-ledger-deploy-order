import { OrderKind, ValueLedgerDeployOrder } from "@0xcert/ethereum-gateway";

export const config = {
  providerConfig: {
    requiredConfirmations: 1,
    // ropsten config
    gatewayConfig: {
      actionsOrderId: "0x6Cb40DB529637C218824a2660EFC7CbaD5485115",
      assetLedgerDeployOrderId: "0x9de066264347165693eC890ccC1C8Af8f9A15f51",
      valueLedgerDeployOrderId: "0x327577e70e21AcEe01447AD06939Fb4057232b2A"
    }
  },
  valueLedgerId: "0xc0603333E382f0247E9dFEa8AC273aF2Ba826D8F", // Input you own value ledger id
  account1Id: "0xF9196F9f176fd2eF9243E8960817d5FbE63D79aa", // Input your primary metamask account Id.
  signature: ""
};

export const order = {
  kind: OrderKind.VALUE_LEDGER_DEPLOY_ORDER,
  makerId: config.account1Id,
  seed: Date.now(),
  expiration: Date.now() + 86400000,
  valueLedgerData: {
    name: "test",
    symbol: "TST",
    supply: "5000000000000000000000000",
    decimals: "18",
    ownerId: config.account1Id
  },
  tokenTransferData: {
    ledgerId: config.valueLedgerId,
    value: "100000000000000000000"
  }
} as ValueLedgerDeployOrder;
