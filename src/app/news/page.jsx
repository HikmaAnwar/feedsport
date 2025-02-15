"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Text,
  Loader,
  Image,
  Grid,
  Badge,
  Group,
  Button,
  Pagination,
} from "@mantine/core";
import { fetchFootballNews } from "@/lib/api";
import Search from "@/components/Search";

interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
}

export default function FootballNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const itemsPerPage = 3;

  const handleFetch = async () => {
    setLoading(true);
    fetchFootballNews()
      .then((data) => {
        setArticles(data);
        setFilteredArticles(data);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
    setCurrentPage(1);
  };

  if (loading)
    return (
      <div className="mx-auto text-center flex justify-center items-center my-10">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="mx-auto text-center flex justify-center items-center my-10">
        <Text className="text-red-600">{error}</Text>
      </div>
    );

  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex">
        <h1 className="text-2xl font-bold mb-4">
          Football News{" "}
          {currentArticles.length > 0 ? `(${filteredArticles.length}) ` : 0}
        </h1>
        <Button variant="light" className="mb-4 ml-5" onClick={handleFetch}>
          {" "}
          Refresh{" "}
        </Button>
      </div>
      <Search onSearch={handleSearch} />
      <Grid className="mt-6">
        {currentArticles.length > 0 ? (
          currentArticles.map((article, index) => (
            <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
              <Card
                shadow="md"
                p="lg"
                radius="md"
                className="hover:shadow-lg transition-all border border-gray-300"
              >
                {article.urlToImage && (
                  <Image
                    src={article.urlToImage}
                    alt={article.title}
                    height={180}
                    radius="md"
                  />
                )}
                <Text className="font-bold mt-3">{article.title}</Text>
                {article.author && (
                  <Text size="sm" className="text-gray-500">
                    By {article.author}
                  </Text>
                )}
                <Group mt="xs">
                  <Badge color="blue">{article.source.name}</Badge>
                  <Text size="xs" className="text-gray-400">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </Text>
                </Group>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 font-medium mt-3 inline-block"
                >
                  Read More →
                </a>
              </Card>
            </Grid.Col>
          ))
        ) : (
          <div className="mx-auto text-center flex justify-center items-center my-10">
            <Text className="text-red-600">No Data Found</Text>
          </div>
        )}
      </Grid>
      <div className="mt-4 text-center">
        <Pagination
          value={currentPage}
          onChange={setCurrentPage}
          total={Math.ceil(filteredArticles.length / itemsPerPage)}
        />
      </div>
    </div>
  );
}
