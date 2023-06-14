#!/bin/bash

# Usage: ./tools/cypress-endurance-test.sh <desiredRepetitions>

desiredRepetitions=$1
passedCount=0

start_time=$(date +%s)

for i in $(seq 1 $desiredRepetitions); do
  output=$(npx cypress run --spec "cypress/")
  if [[ $output == *"✔  All specs passed!"* ]]; then
    passedCount=$((passedCount+1))
  fi
done

end_time=$(date +%s)
runtime=$((end_time - start_time))

echo "All specs passed!: x$passedCount times"
echo "Runtime: $(($runtime / 3600)) hours $((($runtime % 3600) / 60)) minutes $(($runtime % 60)) seconds"

if [ $passedCount -ne $desiredRepetitions ]; then
  echo "Some repetitions did not pass successfully."
fi
