"use client"

import React, { useState } from 'react';
import styles from './questions.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const faqData = [
  {
    id: '1',
    question: 'What is thsi website about ?',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque dicta, iste sit cumque, odit sequi fugit repellat pariatur incidunt omnis doloremque nisi similique voluptate praesentium nulla ipsum, eligendi illo necessitatibus.'
  },
  {
    id: '2',
    question: 'How can I contact support?',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque dicta, iste sit cumque, odit sequi fugit repellat pariatur incidunt omnis doloremque nisi similique voluptate praesentium nulla ipsum, eligendi illo necessitatibus.'
  },
  {
    id: '3',
    question: 'How can I donate medical supplies or equipment ?',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque dicta, iste sit cumque, odit sequi fugit repellat pariatur incidunt omnis doloremque nisi similique voluptate praesentium nulla ipsum, eligendi illo necessitatibus.'
  },
  {
    id: '4',
    question: 'How does HIBA&AATA ensure  accountability in its operations?',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque dicta, iste sit cumque, odit sequi fugit repellat pariatur incidunt omnis doloremque nisi similique voluptate praesentium nulla ipsum, eligendi illo necessitatibus.'
  },
];

const Questions = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <b>FAQs</b>
      </div>
      {faqData.map((faq, index) => (
        <div key={index} className={`${styles.faq} ${index === activeIndex ? styles.active : ''}`} onClick={() => toggleFaq(index)}>
          <div className={styles.question}>
            <h3>{faq.question}</h3>
            <div className={styles.iconWrapper}>
              <KeyboardArrowDownIcon />
            </div>
          </div>
          <div className={styles.answer}>
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Questions;
