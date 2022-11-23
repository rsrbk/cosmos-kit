# How to Integrate your Wallet into Cosmos Kit

## 1️⃣ Prepare basic information for wallet

### Required properties

| Key      | Type | Comment |
| ----------- | ----------- | -- |
| **name**      | `WalletName = string`   | identifier |
| **prettyName**   | `string`   | display name |
| **mode**   | `WalletMode = 'extension' \| 'wallet-connect'`   | wallet client type |
| **mobileDisabled**<sup>*</sup>  | `boolean`   | display on mobile or not |

\* <span style={{fontSize: '0.85rem'}}> Usually `true` when **mode** is `wallet-connect`,  `false` when **mode** is `extension`.</span>

### Optional properties

| Key      | Type | Comment |
| ----------- | ----------- | -- |
| **rejectMessage**      | `string`   | error message when reject permission to wallet app/extension |
| **connectEventNames**   | `string[]`   | window event names to fire auto-connect |
| **downloads**   | [`Downloads`](https://github.com/cosmology-tech/cosmos-kit/blob/4c1f4b9a818ca1afa08c2067fe0c29a740d8e5ea/packages/core/src/types/wallet.ts#L32-L37) | wallet app/extension download information |
| **logo** | `string`   | wallet logo url, display on default modal |

### Examples

- [Keplr Extension - Wallet Info](https://github.com/cosmology-tech/cosmos-kit/tree/develop/packages/keplr/src/extension/registry.ts)

- [Keplr Mobile - Wallet Info](https://github.com/cosmology-tech/cosmos-kit/tree/develop/packages/keplr/src/wallet-connect/registry.ts)


## 2️⃣ Implement `WalletClient`

`MainWallet` is a class organizing all `ChainWallet`s. **It should extend  `MainWalletBase` class**, in which protected `_chainWallets` property stores all `ChainWallet`s.

### Required methods

| Key      | Type |
| ----------- | ----------- |
| **getAccount**      | `(chainId: string) => Promise<WalletAccount>`<sup>*</sup>   |
| **getOfflineSigner**   | `(chainId: string) => Promise<OfflineSigner> \| OfflineSigner`   |

\* *Type **WalletAccount***

```ts
interface WalletAccount {
  name?: string; // username
  address: string;
}
```

### Optional methods

| Key      | Type | Comment |
| ----------- | ----------- | -- |
| **enable**      | `(chainIds: string \| string[]) => Promise<void>`   | give permission for the webpage to access wallet |
| **addChain**   | `(chainInfo: ChainRecord) => Promise<void>`   | add new Cosmos-SDK based blockchains that isn't natively integrated to wallet app/extension |

### Examples

- [Keplr Client](https://github.com/cosmology-tech/cosmos-kit/tree/develop/packages/keplr/src/client.ts)


## 3️⃣ Extend `ChainWalletBase`

Create a `ChainWallet` class that extends  `ChainWalletBase`. `ChainWallet` provides wallet information for a particular chain, e.g. `address`, `offlineSigner`, etc. 

`ChainWalletBase` has implemented a bunch of methods such as wallet connection, sign, broadcast, etc. [[learn more]](#). Therefore, normally you don't need to do any extra work inside `ChainWallet`. But feel free to overwrite these methods or add new methods/properties if customization is needed to meet new demand.

### Examples

- [Keplr Extension - Chain Wallet](https://github.com/cosmology-tech/cosmos-kit/tree/develop/packages/keplr/src/extension/chain-wallet.ts)

- [Keplr Mobile - Chain Wallet](https://github.com/cosmology-tech/cosmos-kit/tree/develop/packages/keplr/src/wallet-connect/chain-wallet.ts)


## 4️⃣ Extend `MainWalletBase`

Create a `MainWallet` class that extends `MainWalletBase`. `MainWallet` organizes all `ChainWallet`s, which are stored in protected member `_chainWallets`.

> Note: Class `ChainWallet` created in [Step 3](#3️⃣-extend-chainwalletbase) is required in `MainWalletBase` construction.

### Required methods

| Key      | Type |
| ----------- | ----------- |
| **fetchClient**      | `() => WalletClient \| undefined \| Promise<WalletClient \| undefined>`<sup>*</sup>   |

\* <span style={{fontSize: '0.85rem'}}> `WalletClient` is the one implemented in [Step 2](#2️⃣-implement-walletclient).</span>

Also, feel free to overwrite methods in `MainWalletBase` or add new methods/properties if necessary.

### Examples

- [Keplr Extension - Main Wallet](https://github.com/cosmology-tech/cosmos-kit/tree/develop/packages/keplr/src/extension/main-wallet.ts)

- [Keplr Mobile - Main Wallet](https://github.com/cosmology-tech/cosmos-kit/tree/develop/packages/keplr/src/wallet-connect/main-wallet.ts)


## 5️⃣ Get `MainWallet` instance

You can construct your `MainWallet` Instance according to your `MainWallet` construct method now. Usually the `walletInfo` object prepared in [Step 1](#1️⃣-prepare-basic-information-for-wallet) is imported here as a construction argument.

### Examples

- [keplrExtension & keplrMobile](https://github.com/cosmology-tech/cosmos-kit/tree/develop/packages/keplr/src/keplr.ts)

Last but not least, append this instance to the `wallets` property of [WalletProvider](https://docs.cosmoskit.com/get-started#provider).
