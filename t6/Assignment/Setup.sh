#!/bin/bash

if [ ! -d ../meta ]
then 
	echo "Error. Make sure the folder meta is in the same directory and rerun this script"
	exit 1
fi

echo "MeTA Found"

if [ ! -f ../meta/src/tools/profile.cpp ] || [ ! -f ../meta/src/tools/CMakeLists.txt ] || [ ! -f ../meta/build/config.toml ]
then
	echo "Error. Make sure you have installed MeTA correctly."
	exit 1
fi

echo "Copying assignment files to MeTA"

\cp -f tools/association.cpp tools/plsa.cpp tools/competition.cpp tools/CMakeLists.txt ../meta/src/tools/
if [ ! $? -eq 0 ]; then echo "Error. Make sure the script has enough writing privileges"; exit 1; fi

\cp -rf datasets/reviews datasets/yelp datasets/hygiene perceptron-tagger ../meta/data/
if [ ! $? -eq 0 ]; then echo "Error. Make sure the script has enough writing privileges"; exit 1; fi

\cp -f config.toml ../meta/build/config.toml
if [ ! $? -eq 0 ]; then echo "Error. Make sure the script has enough writing privileges"; exit 1; fi

\cp -rf Assignment ../meta/build/
if [ ! $? -eq 0 ]; then echo "Error. Make sure the script has enough writing privileges"; exit 1; fi

echo "Files copied successfully!"
exit 0
