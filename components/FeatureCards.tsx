"use client"
export function FeatureCards() {
  return (
    <div className="relative z-20 flex justify-center gap-8 py-16 bg-gray-900/80 mt-auto">
      <FeatureCard number="01" title="Some Feature" isPrimary />
      <FeatureCard number="02" title="Another Feature" />
      <FeatureCard number="03" title="Yet Another" />
    </div>
  )
}

function FeatureCard({ number, title, isPrimary = false }: { 
  number: string, 
  title: string, 
  isPrimary?: boolean 
}) {
  return (
    <div className={`flex flex-col items-center justify-center ${
      isPrimary ? 'bg-orange-500' : 'bg-gray-700'
    } text-white p-8 rounded-lg shadow-lg w-64 h-48`}>
      <span className="text-6xl font-bold">{number}</span>
      <p className="text-center mt-2">{title}</p>
    </div>
  )
}