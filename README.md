## What is Quadratic Voting ??

Quadratic voting is a participatory decision-making method where voters allocate "voice credits" to express preferences on issues. Votes cost quadratically more with each additional vote, allowing for more nuanced expression of preferences.

## Based on the references of Research Paper 

-  [Quadratic Funding](https://arxiv.org/pdf/1809.06421.pdf) by [@vitalik](https://twitter.com/vitalikbuterin) , [@zhitzig](https://twitter.com/zhitzig) and [@glenweyl](https://twitter.com/glenweyl)

## How Quadratic Votes makes Difference
The principle holds that the collective preferences of the majority should take precedence over those of the minority, reflecting a democratic ethos of prioritizing the greater good.

<img width="1100" alt="qvote1" src="https://github.com/sanjay-sol/Quadratic_Voting/assets/114111046/5a0fa4a6-6d51-4dd2-9042-afa9b37fc486">

## Sample Voting Results
Here is the sample example of how Quadratic Voting system works given three entities to vote upon and 100 credits for each voter.

<img width="1100" alt="qvote2" src="https://github.com/sanjay-sol/Quadratic_Voting/assets/114111046/44bfa14a-4356-47ae-9fb5-ec98d103fd32">

## On-Chain Ethereum Attestations

Ethereum attestations are utilized for ensuring the integrity and authenticity of voting records on the Ethereum blockchain. 

<img width="1100" alt="qvote3" src="https://github.com/sanjay-sol/Quadratic_Voting/assets/114111046/9484938a-d699-4795-aa11-781a59668276">

## Dependencies
- @ethereum-attestation-service/eas-sdk
- GraphQL
- TypeScript
- Next.js
- ethers
- apollo client
- mongoose

 # Project Setup Guide

## GraphQl Server Setup:
```
1. Provide your MongoDB URL in the `.env` file.
2. Run `npm install`.
3. Navigate to the server directory: `cd server`.
4. Start the server in development mode: `npm run dev`.
5. The server will run on `localhost:3001`.
6. Access the Apollo Playground at `localhost:4000`.
```

## Client Setup:
```
1. Run `npm install`.
2. Start the client in development mode: `npm run dev`.
3. The client will run on `localhost:3000`.
```

That's it! Your project is now set up and running.


