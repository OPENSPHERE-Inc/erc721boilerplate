# ERC721 スマートコントラクト・ボイラープレート

## 1. インストール

```shell
git clone git@github.com:OPENSPHERE-Inc/erc721boilerplate.git
cd erc721boilerplate
yarn install
mv dot.env .env
```

## 2. 設定

### 2.1. `.env` を編集

```dotenv
# Test network
PROXY_REGISTRY_ADDRESS=0xf57b2c51ded3a29e6891aba85459d600256cf317
NODE_URL=Replace your API URL
WALLET_PRIVATE_KEY=Replace your private key

# Mainnet
#PROXY_REGISTRY_ADDRESS=0xa5409ec958c83c3f309868babaca7c86dcb077c1
#NODE_URL=Replace your API URL
#WALLET_PRIVATE_KEY=Replace your private key

# Token metadata
TOKEN_NAME=My special item
TOKEN_SYMBOL=MSI
TOKEN_BASE_URI=http://www.url.to/metadata/
```

`Test network` にテストの設定、`Mainnet` に本番の設定を入れます。 
使う方の行からコメントを外してください。

- `PROXY_REGISTRY_ADDRESS` マーケットプレース OpenSea から指定されるアドレスで、コントラクトのデプロイ時に使用されます。
- `NODE_URL` デプロイ用に用意したノードの API URI です。[Alchemy](https://www.alchemyapi.io/) から無料で借りられますので、
  CREATE APP を使って、「Network」にテストの場合は「Rinkeby」、本番の場合は「Mainnet」を選択してノードを作成してください。
  APP ダッシュボードから VIEW KEY → HTTP の URL をコピー＆ペーストすればOKです。
- `WALLET_PRIVATE_KEY` NFTのオーナーとなるアドレスの秘密鍵を指定します。デプロイ時のガス代もこのアドレスから支払われます。
- `TOKEN_NAME` トークンの名前
- `TOKEN_SYMBOL` トークンのシンボル
- `TOKEN_BASE_URI` json ファイルの格納場所

### 2.2. メタデータ json の作成とアップロード

メタデータの json ファイルを作成して、外部からアクセス可能な Web ストレージにアップロードしてください。
また、同じく画像もアップロードしてください。

**json ファイルの一例**

```json
{
    "name": "My special item",
    "description": "This is most rare item in the world.",
    "image": "https://www.url.to/picture-of-item.png",
}
```

- `name` 名前
- `description` 説明
- `image` 画像ファイルURL


## 3. コンパイル

```shell
$ yarn compile
```

## 4. 単体テスト

```shell
$ yarn test
```

## 5. デプロイ

デプロイ前に、アカウントにネットワーク手数料（ガス代）用の Ether が必要となります。
Rinkeby Test Network の場合は [こちら](https://faucet.rinkeby.io/) で入手できます。
Mainnet の場合は取引所で購入してください。

Mainnet へのデプロイは、本物の資産からガス代が差し引かれますから十分注意し、自己責任で実行してください。

```shell
$ yarn deploy
```

コントラクトのアドレスが表示されるのでメモって下さい。
このアドレスをもとに [OpenSea](https://opensea.io/) 等のマーケットプレースに出品します。
