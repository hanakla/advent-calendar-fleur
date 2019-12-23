export interface UserEntity {
  id: string;
  name: string;
}
const context = baseOperationContext.derive(({ injectDep }) => {
  // Storeの特定の状態を設定する場合は `deriveStore` をする
  // deriveStore(AppStore, { credentialKey: 'mock' })

  // API.getCharacterをモックする
  injectDep(API.getCharacter, async (_, characterId) => fakeRawCharacter());
});
