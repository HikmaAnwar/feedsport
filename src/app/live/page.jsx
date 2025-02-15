"use client";

import { useState, useEffect } from "react";
import { fetchLiveScores } from "@/lib/api";
import {
  Card,
  Grid,
  Text,
  Loader,
  Pagination,
  Modal,
  Image,
  Stack,
  Badge,
  Button,
} from "@mantine/core";
import Search from "@/components/Search";

export default function LiveMatchesPage() {
  //eslint-disable-next-line
  const [liveScores, setLiveScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  //eslint-disable-next-line
  const [filteredMatches, setFilteredMatches] = useState<any[]>([]);
  const itemsPerPage = 6;

  //eslint-disable-next-line
  const [selectedMatch, setSelectedMatch] = useState<any | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    const data = await fetchLiveScores();
    if (data) {
      setLiveScores(data);
      setFilteredMatches(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredMatches(liveScores);
    } else {
      const filtered = liveScores.filter(
        (match) =>
          match.homeTeam.name.toLowerCase().includes(query.toLowerCase()) ||
          match.awayTeam.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMatches(filtered);
    }
    setCurrentPage(1);
  };

  const currentMatches = filteredMatches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading)
    return (
      <div className="mx-auto text-center flex justify-center items-center my-10">
        <Loader />
      </div>
    );

  if (!loading && liveScores.length === 0)
    return (
      <div className="mx-auto text-center flex justify-center items-center my-10">
        <Text className="text-red-600">No Data Found</Text>
      </div>
    );

  //eslint-disable-next-line
  const openMatchDetails = (match: any) => {
    setSelectedMatch(match);
  };

  const closeDetailsModal = () => {
    setSelectedMatch(null);
  };

  return (
    <div className="p-6">
      <div className="flex">
        <h1 className="text-2xl font-bold mb-4">
          Live Scores{liveScores.length > 0 ? ` (${liveScores.length})` : 0}
        </h1>
        <Button variant="light" className="mb-4 ml-5" onClick={handleFetch}>
          {" "}
          Refresh{" "}
        </Button>
      </div>

      <Search onSearch={handleSearch} />

      <Grid className="mt-6">
        {currentMatches.map((match) => (
          <Grid.Col key={match.id} span={{ base: 12, md: 6, lg: 4 }}>
            <Card
              shadow="sm"
              p="lg"
              className="hover:shadow-xl transition-shadow duration-300 border border-gray-300"
            >
              <Text size="lg" className="text-center flex">
                <span className="flex items-center justify-center mr-3 ">
                  <Image
                    src={match.homeTeam.crest}
                    alt={match.homeTeam.name}
                    className="w-5 h-5 mr-1"
                  />
                  {match.homeTeam.tla}
                </span>{" "}
                vs{" "}
                <span className="flex items-center justify-center ml-3">
                  <Image
                    src={match.awayTeam.crest}
                    alt={match.awayTeam.name}
                    className="w-5 h-5 mr-1"
                  />
                  {match.awayTeam.tla}
                </span>
              </Text>
              <Text size="md" color="dimmed">
                {match.score.fullTime.home ?? 0} -{" "}
                {match.score.fullTime.away ?? 0}
              </Text>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => openMatchDetails(match)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                  View Details
                </button>
              </div>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <div className="mt-4 text-center">
        <Pagination
          value={currentPage}
          onChange={setCurrentPage}
          total={Math.ceil(filteredMatches.length / itemsPerPage)}
        />
      </div>

      <Modal
        opened={selectedMatch !== null}
        onClose={closeDetailsModal}
        title="Match Details"
        size="lg"
      >
        {selectedMatch && (
          <div>
            <Grid>
              <Grid.Col span={12} className="text-center">
                <span className="flex items-center justify-center">
                  <Image
                    src={selectedMatch.competition.emblem}
                    alt="Competition"
                    className="mx-auto w-20 h-20"
                  />
                </span>
                <Text size="xl" className="truncate">
                  {selectedMatch.competition.name}
                </Text>
                <Text size="sm">
                  {selectedMatch.area.name} - {selectedMatch.stage}
                </Text>
                <Badge color="blue" variant="filled" size="lg">
                  {selectedMatch.status}
                </Badge>
              </Grid.Col>
            </Grid>

            <Stack mt="md">
              <Grid className="bg-gray-300 text-center p-4 rounded-lg">
                <Grid.Col span={5} className="text-center">
                  <span className="flex items-center justify-center">
                    <Image
                      src={selectedMatch.homeTeam.crest}
                      alt={selectedMatch.homeTeam.name}
                      className="w-10 h-10"
                    />
                  </span>
                  <Text mt="xs">{selectedMatch.homeTeam.name}</Text>
                </Grid.Col>
                <div className="text-center mt-10">
                  <Text size="xl">
                    {selectedMatch.score.fullTime.home ?? 0} -{" "}
                    {selectedMatch.score.fullTime.away ?? 0}
                  </Text>
                </div>
                <Grid.Col span={5} className="text-center">
                  <span className="flex items-center justify-center">
                    <Image
                      src={selectedMatch.awayTeam.crest}
                      alt={selectedMatch.awayTeam.name}
                      className="w-10 h-10"
                    />
                  </span>
                  <Text mt="xs">{selectedMatch.awayTeam.name}</Text>
                </Grid.Col>
              </Grid>

              <Text size="sm">
                <strong>Half Time Result:</strong>{" "}
                {selectedMatch.score.halfTime.home} -{" "}
                {selectedMatch.score.halfTime.away}
              </Text>

              <Text size="sm">
                <strong>Date:</strong>{" "}
                {new Date(selectedMatch.utcDate).toLocaleString()}
              </Text>

              <Text size="sm">
                <strong>Referee:</strong> {selectedMatch.referees[0].name} (
                {selectedMatch.referees[0].nationality})
              </Text>

              {selectedMatch.odds.msg && (
                <Text size="sm">
                  <strong>Odds:</strong> {selectedMatch.odds.msg}
                </Text>
              )}
            </Stack>
          </div>
        )}
      </Modal>
    </div>
  );
}
