#!/bin/bash

echo preparing xp-soaring
cd ../xp-soaring.github.io
git pull
rm -r tasks/discord_template/

echo copying files from MSFS_soaring_tasks
cd ../MSFS_soaring_tasks
cp -r discord_template ../xp-soaring.github.io/tasks/

cd ../xp-soaring.github.io

echo --------------------------------------------------------
echo NOW xp-soaring.github.io GIT ADD/COMMIT/PUSH
echo --------------------------------------------------------
