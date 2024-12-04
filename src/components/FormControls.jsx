import React from 'react'
import formControls from './FormControls.module.scss';


// Material UI
import Button from '@mui/material/Button';

const FormControls = () => {
  return (
    <section className={formControls.pageContainer}>
      <div className={formControls.btnWrapper}>
        <Button className={formControls.draft}>DRAFT</Button>
        <Button className={formControls.proceed}>PROCEED</Button>
      </div>
    </section>
  )
}

export default FormControls