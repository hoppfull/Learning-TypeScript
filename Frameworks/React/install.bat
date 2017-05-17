@ECHO OFF

PUSHD "./server/"

CALL npm i

POPD

PUSHD "./client/source/"

CALL npm i

POPD

PAUSE