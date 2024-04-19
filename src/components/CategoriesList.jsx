"use client"

// CategoryList.jsx
import React, { useState, useEffect } from "react";
import styles from "./categoryList.module.css";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXTAUTH_URL|| 'http://localhost:3000';

const getData = async () => {
  const res = await fetch(`${API_BASE_URL}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getData();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    // Filter immediately after category selection
    if (selectedCategory) {
      router.push(`/feed?cat=${encodeURIComponent(selectedCategory)}`);
    } else {
      router.push("/feed");
    }
  };

  return (
    <div className="mt-8">
      <h1 className="my-3">Catégories:</h1>
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="block appearance-none w-full bg-white border border-gray-200  px-4 py-2 pr-8 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline h-10 overflow-y-auto"
        >
          <option value="">Sélectionnez matériel</option>
          {categories.map((category) => (
            <option key={category.id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 12.586l-6.293-6.293a1 1 0 0 1 1.414-1.414L10 10.172l5.879-5.879a1 1 0 1 1 1.414 1.414L10 12.586z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;

