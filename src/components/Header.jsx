"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import header from './Header.module.scss'; // Import css modules stylesheet as styles

// Material UI
import Button from '@mui/material/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const stages = [
  { title: 'Job Details', desc: 'Job Details desc', step: 'step1' },
  { title: 'Configure Skillset', desc: 'Configure Skillset Desc', step: 'step2' },
  { title: 'Summary and Review', desc: 'Summary and Review', step: 'step3' },
];

const Header = () => {
  const pathname = usePathname();
  const currentStep = pathname.split('/').pop();
  
  return (
    <header className={header.headerContainer}>
      <Link href="/">
        <Button className={header.customButton} variant="text"><KeyboardArrowLeftIcon className={header.icon} /> Back</Button>
      </Link>

      {/* Stages */}
      <div className={header.stages}>
        {stages.map(({ title, desc, step }, index) => (
          <React.Fragment key={index}>
            <div 
              className={`${header.stage} ${currentStep === step ? header.activeStage : ''}`}>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>

            {/* Add divider after each stage except the last one */}
            {index < stages.length - 1 && <div className={header.divider}></div>}
          </React.Fragment>
        ))}
      </div>

      <div></div>
    </header>
  )
}

export default Header