#ifndef IDENTITYKEY_H_
#define IDENTITYKEY_H_

#include <SQLiteCpp/SQLiteCpp.h>
#include <string>

using namespace std;

namespace CriptextDB {

  struct IdentityKey { 
    string recipientId;
    long int deviceId;
    string identityKey;
  };

  IdentityKey getIdentityKey(string dbPath, string recipientId, long int deviceId);
  bool createIdentityKey(string dbPath, string recipientId, int deviceId, char *identityKey);
} 

#endif