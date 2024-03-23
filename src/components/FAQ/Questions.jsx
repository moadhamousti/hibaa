"use client"

import React, { useState } from 'react';
import styles from './questions.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const faqData = [
  {
    id: '1',
    question: 'Quel type d\'équipements médicaux puis-je trouver sur ce site ?',
    answer: 'Notre site propose une variété d\'équipements médicaux tels que des fauteuils roulants, des béquilles, des lits médicalisés, des déambulateurs, des appareils respiratoires, et bien plus encore. Nous faisons de notre mieux pour inclure une large gamme d\'équipements pour répondre aux besoins divers de notre communauté'
  },
  {
    id: '2',
    question: 'Qui peut bénéficier de ces équipements médicaux gratuits?',
    answer: 'Nos services sont disponibles pour toute personne ayant besoin d\'équipements médicaux, qu\'il s\'agisse de patients, de personnes âgées, de personnes handicapées, ou de toute autre personne nécessitant ces équipements. Notre objectif est d\'aider ceux qui en ont besoin à accéder à ces ressources gratuitement.'
  },
  {
    id: '3',
    question: 'Comment puis-je trouver des équipements médicaux sur ce site ?',
    answer: 'Vous pouvez utiliser notre fonction de recherche avancée pour trouver des équipements médicaux en fonction de vos besoins spécifiques. Vous pouvez filtrer les résultats par type d\'équipements et les villes.'
  },
];

const Questions = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={styles.container} id='faq'>
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
