#!/bin/bash
docker build -t emojijournal-run .
docker build -t emojijournal-build -f Dockerfile-tools .
docker run -v $PWD:/root/project -w /root/project emojijournal-build /swift-utils/tools-utils.sh build release
# To make this run in Docker, create a network, start CouchDB on this network,
# then add the --network option to this command before running this shell script.
docker run --name emojijournal -it -p 8090:8080 -v $PWD:/root/project -w /root/project emojijournal-run sh -c .build-ubuntu/release/EmojiJournalServer
