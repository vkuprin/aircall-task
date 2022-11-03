const authNamespace = 'auth';
const signIn = `${authNamespace}/login`;
const refresh = `${authNamespace}/refresh-token-v2`;
const deprecatedRefresh = `${authNamespace}/refresh-token`;

const calls = 'cals';
const callsDynamic = `${calls}/:id`;
const callsDynamicNote = `${callsDynamic}/note`;
const callsDynamicArchive = `${callsDynamic}/archive`;

const currentUser = 'me';

export {
  signIn,
  calls,
  callsDynamic,
  callsDynamicNote,
  callsDynamicArchive,
  currentUser,
};
