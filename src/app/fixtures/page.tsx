"use client";

import React, { useEffect, useState } from "react";
import { fetchUpcomingMatches } from "@/lib/api";
import {
  Loader,
  Table,
  Text,
  Button,
  Collapse,
  Pagination,
  Image,
} from "@mantine/core";
import Search from "@/components/Search";

export default function UpcomingMatchesPage() {
  // eslint-disable-next-line
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [opened, setOpened] = useState<string | null>(null);
  // eslint-disable-next-line
  const [filteredMatches, setFilteredMatches] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleFetch = async () => {
    setLoading(true);
    const data = await fetchUpcomingMatches();
    if (data) {
      setMatches(data);
      setFilteredMatches(data);
    } else {
      setError("Error fetching data");
    }
    setLoading(false);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredMatches(matches);
    } else {
      const filtered = matches.filter((match) =>
        match.strEvent.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMatches(filtered);
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading)
    return (
      <div className="mx-auto text-center flex justify-center items-center my-10">
        <Loader />
      </div>
    );

  if (!loading && matches.length === 0)
    return (
      <div className="mx-auto text-center flex justify-center items-center my-10">
        <Text className="text-red-600">No Data Found, {error}</Text>
      </div>
    );

  const paginatedMatches = filteredMatches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex">
        <h1 className="text-2xl font-bold mb-4">Upcoming Matches</h1>
        <Button variant="light" className="mb-4 ml-5" onClick={handleFetch}>
          {" "}
          Refresh{" "}
        </Button>
      </div>
      <Search onSearch={handleSearch} />
      <Table className="mt-6">
        <thead>
          <tr>
            <th>Match</th>
            <th>League</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {paginatedMatches.map((event) => (
            <React.Fragment key={event.idEvent}>
              <tr className="border border-gray-400">
                <td>{event.strEvent}</td>
                <td>{event.strLeague}</td>
                <td>{event.dateEvent}</td>
                <td>{event.strTime}</td>
                <td>
                  <Button
                    variant="light"
                    onClick={() =>
                      setOpened(opened === event.idEvent ? null : event.idEvent)
                    }
                    className="my-2"
                  >
                    {opened === event.idEvent ? "Hide" : "Show"} Details
                  </Button>
                </td>
              </tr>
              <tr>
                <td colSpan={5}>
                  <Collapse in={opened === event.idEvent}>
                    <div className="p-4 bg-gray-100 text-center mx-auto">
                      {event.strHomeTeamBadge && event.strAwayTeamBadge && (
                        <div className="flex justify-center gap-4">
                          <Image
                            src={event.strHomeTeamBadge}
                            alt="Home Team Badge"
                            width={10}
                            height={10}
                            className="w-10 h-10 my-2"
                          />
                          <Image
                            src={event.strAwayTeamBadge}
                            alt="Away Team Badge"
                            width={10}
                            height={10}
                            className="w-10 h-10 my-2"
                          />
                        </div>
                      )}
                      <h3 className="font-bold">Match Details:</h3>
                      <Text>
                        <strong>Home Team:</strong> {event.strHomeTeam}
                      </Text>
                      <Text>
                        <strong>Away Team:</strong> {event.strAwayTeam}
                      </Text>
                      <Text>
                        <strong>Venue:</strong> {event.strVenue}
                      </Text>
                      <Text>
                        <strong>Kickoff:</strong>{" "}
                        {new Date(event.strTimestamp).toLocaleString()}
                      </Text>
                    </div>
                  </Collapse>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      <div className="flex justify-center mt-4">
        <Pagination
          value={currentPage}
          onChange={handlePageChange}
          total={Math.ceil(filteredMatches.length / itemsPerPage)}
        />
      </div>
    </div>
  );
}
