set -e # exit when one of the command fail

echo '✨  Check TypeScript in the whole project';
tsc --noEmit
echo "  ✔ TypeScript is good !"

echo '✨  Run tests';
npm test
echo "  ✔ All good !"
