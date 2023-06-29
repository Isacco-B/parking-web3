// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract RentParking {
    struct ParkingSpace {
        address owner;
        address renter;
        string city;
        string streetAddress;
        uint256 postCode;
        string description;
        string image;
        bool isAvailable;
        uint256 pricePerHour;
        uint256 startTime;
        uint256 endTime;
    }

    mapping(uint256 => ParkingSpace) public parkingSpaces;
    uint256 public nextParkingSpaceId;

    event ParkingSpaceCreated(uint256 parkingSpaceId, address owner, uint256 pricePerHour);
    event ParkingSpaceRented(uint256 parkingSpaceId, address renter, uint256 startTime, uint256 endTime);
    event ParkingSpaceReturned(uint256 parkingSpaceId, address renter, uint256 endTime);

    function createParkingSpace(string memory city, string memory streetAddress, uint256 postCode, string memory description, uint256 pricePerHour, string memory image) external {
        parkingSpaces[nextParkingSpaceId] = ParkingSpace({
            owner: msg.sender,
            renter: address(0),
            city: city,
            postCode: postCode,
            streetAddress: streetAddress,
            description: description,
            image: image,
            isAvailable: true,
            pricePerHour: pricePerHour,
            startTime: 0,
            endTime: 0
        });

        emit ParkingSpaceCreated(nextParkingSpaceId, msg.sender, pricePerHour);
        nextParkingSpaceId++;
    }

    function rentParkingSpace(uint256 _parkingSpaceId, uint256 _hours) external payable {
        require(parkingSpaces[_parkingSpaceId].isAvailable, "Parking space is not available");
        require(msg.value >= parkingSpaces[_parkingSpaceId].pricePerHour * _hours, "Insufficient payment");

        parkingSpaces[_parkingSpaceId].renter = msg.sender;
        parkingSpaces[_parkingSpaceId].isAvailable = false;
        parkingSpaces[_parkingSpaceId].startTime = block.timestamp;
        parkingSpaces[_parkingSpaceId].endTime = block.timestamp + (_hours * 1 hours);

        emit ParkingSpaceRented(_parkingSpaceId, msg.sender, parkingSpaces[_parkingSpaceId].startTime, parkingSpaces[_parkingSpaceId].endTime);

    }

    function returnParkingSpace(uint256 parkingSpaceId) external {
        require(!parkingSpaces[parkingSpaceId].isAvailable, "Parking space is not rented");
        require(msg.sender == parkingSpaces[parkingSpaceId].renter, "Only the renter can return the parking space");
        require(block.timestamp >= parkingSpaces[parkingSpaceId].endTime, "Cannot return the parking space before the rental period ends");

        payable(parkingSpaces[parkingSpaceId].owner).transfer(parkingSpaces[parkingSpaceId].pricePerHour * ((parkingSpaces[parkingSpaceId].endTime - parkingSpaces[parkingSpaceId].startTime) / 1 hours));

        parkingSpaces[parkingSpaceId].isAvailable = true;
        parkingSpaces[parkingSpaceId].startTime = 0;
        parkingSpaces[parkingSpaceId].endTime = 0;
        parkingSpaces[parkingSpaceId].renter = address(0);

        emit ParkingSpaceReturned(parkingSpaceId, msg.sender, parkingSpaces[parkingSpaceId].endTime);
    }

    function setParkingSpaceAvailability(uint256 parkingSpaceId, bool availability) external {
        require(parkingSpaces[parkingSpaceId].owner == msg.sender, "Only the owner can set the parking space availability");
        require(parkingSpaces[parkingSpaceId].renter == address(0), "It is not possible to change the status if the car park is occupied");

        parkingSpaces[parkingSpaceId].isAvailable = availability;
    }

    function getRenterAddress(uint256 parkingSpaceId) external view returns (address) {
        return parkingSpaces[parkingSpaceId].renter;
    }

    function getParkingSpace() external view returns (ParkingSpace[] memory) {
        ParkingSpace[] memory allParkingSpace = new ParkingSpace[](nextParkingSpaceId);

        for (uint256 i = 0; i < nextParkingSpaceId; i++) {
            ParkingSpace storage item = parkingSpaces[i];
            allParkingSpace[i] = item;
        }
        return allParkingSpace;
    }

}
