import { OrderKind, AssetLedgerDeployOrder } from "@0xcert/ethereum-gateway";
import { AssetLedgerCapability } from "@0xcert/scaffold";

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
  valueLedgerId: "", // Input you own value ledger id
  account1Id: "", // Input your primary metamask account Id.
  signature: ""
};

export const order = {
  kind: OrderKind.ASSET_LEDGER_DEPLOY_ORDER,
  makerId: config.account1Id,
  seed: Date.now(),
  expiration: Date.now() + 86400000,
  assetLedgerData: {
    name: "test",
    symbol: "TST",
    uriPrefix: "https://base.com/",
    uriPostfix: ".json",
    schemaId:
      "9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658",
    capabilities: [
      AssetLedgerCapability.TOGGLE_TRANSFERS,
      AssetLedgerCapability.DESTROY_ASSET
    ],
    ownerId: config.account1Id
  },
  tokenTransferData: {
    ledgerId: config.valueLedgerId,
    value: "100000000000000000000"
  }
} as AssetLedgerDeployOrder;
