// deposit money
// verify attendance
// rules for refunding the money after the event
// distributing non-attender's money to the attenders

// you can't be refunded if you don't turn up to the event

pragma solidity 0.4.19;

contract BlockParty {
    mapping(address => uint) public deposits;
    address public owner;

    function BlockParty () public {
        owner = msg.sender;
    }

    function Hello() public returns (uint) {
        return 1234567;
    }

    function deposit() public payable {

    }

    // function deposit() public payable {
        // deposits[msg.sender] += msg.value;
    // }

    function refund(address[] attendees) public {
        require (msg.sender == owner);
        uint toSend = this.balance / attendees.length;
        for (uint i = 0; i < attendees.length; i += 1) {
            attendees[i].transfer(toSend);
        }
    }

}
