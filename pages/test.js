import React from 'react'
import Button from '../components/Atomic/Button'
import Link from 'next/link'

export default function Test() {
  return (
    <div>
      <Button>Hola</Button>
      <Button outlined={true}>Hola-Dos</Button>
      <Button>
        <Link href='/'>
          <a> Hello link</a>
        </Link>
      </Button>
    </div>
  )
}
