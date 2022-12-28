# Creates tables in your local dev environment. Make sure these tables match
# settings in tables.yaml to avoid issues going from dev -> prod.
# note: you may need to grant yourself permission to run this script. see 
# https://stackoverflow.com/questions/12276507/run-script-on-mac-prompt-permission-denied

AWS_PAGER="" aws dynamodb create-table \
--table-name bills_table \
--attribute-definitions AttributeName=id,AttributeType=S \
--key-schema AttributeName=id,KeyType=HASH \
--endpoint-url http://localhost:8000 \
--billing-mode PAY_PER_REQUEST \
--region us-east-1

AWS_PAGER="" aws dynamodb create-table \
--table-name votes_table \
--attribute-definitions AttributeName=id,AttributeType=S \
--key-schema AttributeName=id,KeyType=HASH \
--endpoint-url http://localhost:8000 \
--billing-mode PAY_PER_REQUEST \
--region us-east-1

AWS_PAGER="" aws dynamodb create-table \
--table-name users_table \
--attribute-definitions AttributeName=id,AttributeType=S \
--key-schema AttributeName=id,KeyType=HASH \
--endpoint-url http://localhost:8000 \
--billing-mode PAY_PER_REQUEST \
--region us-east-1