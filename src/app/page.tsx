"use client";

import Link from "next/link";
import { Button, Container, Text, Title } from "@mantine/core";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <Container className="flex flex-col items-center text-center py-20 mt-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Title className="text-4xl font-bold mb-4">
          Welcome to Feed Sports
        </Title>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Text className="text-lg text-gray-600 mb-6">
          Get live scores, upcoming fixtures, and the latest sports news from
          your favorite teams!
        </Text>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="flex gap-4 mt-6"
      >
        <Link href="/live">
          <Button variant="filled" color="blue" size="lg">
            Live Scores
          </Button>
        </Link>
        <Link href="/fixtures">
          <Button variant="outline" color="blue" size="lg">
            Upcoming Fixtures
          </Button>
        </Link>
      </motion.div>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="w-full mt-20 mx-auto text-center bg-gray-200 py-6"
      >
        <Title className="text-2xl font-semibold mb-6">Latest News</Title>
        <Text className="text-md text-gray-600 mb-4">
          Stay updated with breaking sports news, player transfers, and match
          insights.
        </Text>
        <Link href="/news">
          <Button size="sm" className="mt-8" color="blue">
            Read More
          </Button>
        </Link>
      </motion.section>
    </Container>
  );
}
