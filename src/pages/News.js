import React from "react";
import NewsList from "../components/NewsList";
import { fetchNewsPage } from "../api/fetchPages";
import { useState, useEffect } from "react";
export default function News() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const newsData = await fetchNewsPage();
        console.log(newsData); // Log the entire response
        setData(newsData.data); // Set the data to the state
      } catch (err) {
        setError(err.message);
      }
    };
    getData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  // Check if header exists
  const pageTitle = data.attributes.header
    ? data.attributes.header.page_title
    : "Default Title";

  console.log("News");
  return (
    <div>
      <h1>News Page</h1>
      <div>
        <h1>{data.attributes.header[0]?.page_title}</h1>
        <h2>{data.attributes.header[0]?.meta_title}</h2>
        <h3>{data.attributes.header[0]?.meta_keywords}</h3>
        <h4>{data.attributes.header[0]?.meta_description}</h4>
      </div>
      <a href="/">Home</a>
      <br />
      <a href="/news">News</a>
      <br />
      <a href="/categories">Categories</a>
      <NewsList />
    </div>
  );
}
