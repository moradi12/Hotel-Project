import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from "../common/RoomPaginator";
import { getAllRooms } from '../utils/ApiFunctions';
import RoomCard from './RoomCard';

export const Room = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(6);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getAllRooms()
            .then((responseData) => {
                console.log("Received data from API:", responseData);

                if (Array.isArray(responseData)) {
                    const validData = responseData.map(room => ({
                        id: room.id,
                        roomType: room.roomType,
                        roomPrice: room.roomPrice,
                        photo: room.photo,
                        bookings: room.bookings || [],
                        booked: room.booked || false,
                    }));
                    setData(validData);
                    setFilteredData(validData);
                } else {
                    throw new Error("Expected an array but received something else.");
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching rooms:", error);
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading rooms...</div>;
    }

    if (error) {
        return <div className="text-danger">Error: {error}</div>;
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredData.length / roomsPerPage);
    const renderRooms = () => {
        const startIndex = (currentPage - 1) * roomsPerPage;
        const endIndex = startIndex + roomsPerPage;

        if (!Array.isArray(filteredData)) {
            console.error("filteredData is not an array:", filteredData);
            return <div className="text-danger">Error: Invalid data format.</div>;
        }

        return filteredData.slice(startIndex, endIndex).map((room) => (
            <RoomCard key={room.id} room={room} />
        ));
    };

    return (
        <Container>
            <Row>
                <Col md={6} className="mb-3 mb-md-0">
                    <RoomFilter data={data} setFilteredData={setFilteredData} />
                </Col>
            </Row>
            <Row>
                {filteredData.length > 0 ? renderRooms() : <div>No rooms available.</div>}
            </Row>
            <Row>
                <Col md={12} className="d-flex align-items-center justify-content-center mt-4">
                    {totalPages > 1 && (
                        <RoomPaginator
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Room;
