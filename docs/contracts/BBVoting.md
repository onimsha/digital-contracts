# BBVoting

Contract **BBVoting** is *BBStandard* 

imports: [BBStandard.sol](../../src/contracts/BBStandard.sol), [BBLib.sol](../../src/contracts/BBLib.sol)

Source: [BBVoting.sol](../../src/contracts/BBVoting.sol)

BBVoting is the contract implements Partial-Lock Commit-Reveal Voting
 for allow voter can help to reslove the dispute in Freelancer app


  * [Events](#events)
     * [VotingRightsGranted](#votingrightsgranted)
     * [VotingRightsWithdrawn](#votingrightswithdrawn)
     * [VoteCommitted](#votecommitted)
     * [VoteRevealed](#voterevealed)
  * [Modifiers](#modifiers)
     * [isDisputeJob](#isdisputejob)
  * [Functions](#functions)
     * [isAgaintsPoll](#isagaintspoll)
     * [setBBOReward](#setbboreward)
     * [requestVotingRights](#requestvotingrights)
     * [withdrawVotingRights](#withdrawvotingrights)
     * [checkBalance](#checkbalance)
     * [commitVote](#commitvote)
     * [revealVote](#revealvote)
     * [checkHash](#checkhash)
     * [claimReward](#claimreward)
     * [calcReward](#calcreward)


## Events

### VotingRightsGranted
Event for logging the voter request the voting rights.

---
event VotingRightsGranted(address indexed voter, uint256 numTokens);


| Parameter     | Type          | Description                 |
| ------------- |:-------------:| ---------------------------:|
| `voter`       | address       |  address of the voter |
| `numTokens`       | uint256   | the BBO number of the voter request|

### VotingRightsWithdrawn
Event for logging the voter withdraw voting rights 

---
event VotingRightsWithdrawn(address indexed voter, uint256 numTokens);


| Parameter     | Type          | Description                 |
| ------------- |:-------------:| ---------------------------:|
| `voter`       | address       |  address of the voter |
| `numTokens`       | uint256   | the number of BBO withdrawn |


### VoteCommitted
Event for logging the voter commit vote for job hash

---
event VoteCommitted(address indexed voter, bytes jobHash);

| Parameter     | Type          | Description                 |
| ------------- |:-------------:| ---------------------------:|
| `voter`       | address       |  address of the voter |
| `jobHash`       | bytes       |  Hash of the job store on IPFS  |


### VoteRevealed
Event for logging the voter reveal the commit vote

---
event VoteRevealed(address indexed voter, bytes jobHash, bytes32 secretHash);

| Parameter     | Type          | Description                 |
| ------------- |:-------------:| ---------------------------:|
| `voter`       | address       |  address of the voter |
| `numTokens`       | uint256   | the number of BBO withdrawn |
| `secretHash`       | bytes32   | the hash of commit vote |


## Modifiers

### isDisputeJob
Check the job hash is the dispute job

---

```javascript
modifier isDisputeJob(bytes jobHash){
    uint256 jobStatus = bbs.getUint(BBLib.toB32(jobHash,'STATUS'));
    require(jobStatus == 4);
    require(bbs.getAddress(BBLib.toB32(jobHash, 'DISPUTE_WINNER'))==address(0x0));
    _;
  }
```
## Functions

### isAgaintsPoll
Check this Poll started for the job Hash has againts or not

---
function isAgaintsPoll(bytes jobHash) public constant returns(bool)

| Parameter     | Type          | Description                 |
| ------------- |:-------------:| ---------------------------:|
| `jobHash`       | bytes       |  Hash of the job store on IPFS  |

Return: (Bool)

### setBBOReward
Set bbo reward address, use for send reward to the voter. Only owner can invoke

---
function setBBOReward(address rewardAddress) onlyOwner public

| Parameter     | Type          | Description                 |
| ------------- |:-------------:| ---------------------------:|
| `rewardAddress` | bytes       |  bbo reward address  |

### requestVotingRights
The voter request voting rights by lock the number token, each locked token is 1 vote

---
function requestVotingRights(uint256 numTokens) public 

| Parameter     | Type          | Description                 |
| ------------- |:-------------:| ---------------------------:|
| `numTokens` | uint256       |  number of token to lock |

### withdrawVotingRights
The voter withdraw the locked token

---
function withdrawVotingRights(uint256 numTokens) public 

| Parameter     | Type          | Description                 |
| ------------- |:-------------:| ---------------------------:|
| `numTokens` | uint256       |  number of token to withdraw |

### checkBalance
check the locked token balance

---
function checkBalance() public view returns(uint256 tokens)

Return:

| Parameter     | Type          | Description                 |
| ------------- |:-------------:| ---------------------------:|
| `tokens` | uint256       |  number of locked token |


### commitVote
Voter commit vote for the dispute job

---
function commitVote(bytes jobHash, bytes32 secretHash, uint256 tokens) public 
  isDisputeJob(jobHash)

| Parameter     | Type          | Description                 |
| ------------- |:-------------:| ---------------------------:|
| `jobHash`       | bytes       |  Hash of the job store on IPFS  |
| `secretHash`    | bytes32     |  `keccak256`(choice, salt) |
| `tokens`        | uint256     |  number of token vote for this job |

Modifiers: `isDisputeJob`

### revealVote
Voter reveal vote for the dispute job

---
function revealVote(bytes jobHash, address choice, uint salt) public 
  isDisputeJob(jobHash)

| Parameter     | Type          | Description                 |
| ------------- |:-------------:| ---------------------------:|
| `jobHash`       | bytes       |  Hash of the job store on IPFS  |
| `choice`    | address     |  address of hirer/freelancer choice from commit stage |
| `salt`        | uint256     |  secret salt to encrypt `secretHash`  |

Modifiers: `isDisputeJob`

### checkHash
Voter can check the `secretHash` 

---
function checkHash(bytes jobHash, address choice, uint salt) public view returns(bool)

| Parameter     | Type          | Description                 |
| ------------- |:-------------:| ---------------------------:|
| `jobHash`       | bytes       |  Hash of the job store on IPFS  |
| `choice`    | address     |  address of hirer/freelancer choice from commit stage |
| `salt`        | uint256     |  secret salt to encrypt `secretHash`  |


### claimReward
Voter claim reward 

---
function claimReward(bytes jobHash) public 

| Parameter     | Type          | Description                 |
| ------------- |:-------------:| ---------------------------:|
| `jobHash`       | bytes       |  Hash of the job store on IPFS  |

### calcReward
Calculate the reward of the dispute job hash 

---
function calcReward(bytes jobHash) constant public returns(uint256 numReward)


| Parameter     | Type          | Description                 |
| ------------- |:-------------:| ---------------------------:|
| `jobHash`       | bytes       |  Hash of the job store on IPFS  |

Return: Number of reward.







