
cd app/
npm install
npm run build-dev
cd ../
rm -rf build/
mkdir build/
cd build/
mkdir app/
cd ../
cp -r app/simulator.html app/dest build/app/
cp -r js icons manifest.json build/