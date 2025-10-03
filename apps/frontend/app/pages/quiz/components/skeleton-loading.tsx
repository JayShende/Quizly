import React from 'react'
import Container from '@/app/pages/dashboard/components/container'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

const SkeletonLoading = () => {
  return (
   <Container className='py-10'>
    <Card className="h-[90vh] w-full px-6">
        <Skeleton className="h-44 w-full" />
        <Skeleton className="h-44 w-full" />
        <Skeleton className="h-12 w-1/2" />
        <Skeleton className="h-12 w-1/2" />
    </Card>
    </Container>
  )
}

export default SkeletonLoading