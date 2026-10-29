'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, ChevronLeft, ChevronRight, ImageOff, Loader2, Medal, RefreshCw, Search, Trophy } from 'lucide-react'
import type { PleResult } from '@/lib/ple-results'

type AcademicPerformanceProps = { initialResults?: PleResult[] }

const podiumStyles = [
  { label: 'Dux of the Year', accent: 'text-primary', badge: 'bg-primary/10 text-primary' },
  { label: 'Second place', accent: 'text-primary', badge: 'bg-primary/10 text-primary' },
  { label: 'Third place', accent: 'text-accent', badge: 'bg-accent/10 text-accent' },
]

function Avatar({ result, large = false }: { result: PleResult; large?: boolean }) {
  const [failed, setFailed] = useState(!result.photoUrl)
  return <div className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full border-4 border-white bg-muted text-primary shadow-inner ${large ? 'size-28 sm:size-36' : 'size-16'}`}>
    {failed ? <ImageOff className={large ? 'size-9 text-muted-foreground' : 'size-5 text-muted-foreground'} /> : <img src={result.photoUrl} alt={`${result.name} pupil photo`} className="size-full object-cover" onError={() => setFailed(true)} />}
  </div>
}

function ResultBadges({ result }: { result: PleResult }) {
  return <div className="flex flex-wrap gap-2 text-xs font-bold"><span className="rounded-full bg-primary px-3 py-1 text-primary-foreground">Aggregate {result.aggregate}</span><span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">Division {result.division}</span></div>
}

function PodiumCard({ result, rank }: { result: PleResult; rank: number }) {
  const style = podiumStyles[rank - 1]
  return <article className="relative flex min-h-[330px] flex-col items-center justify-between overflow-hidden rounded-3xl bg-card p-6 text-center shadow-sm">
    <div className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-primary text-lg font-black text-primary-foreground">#{rank}</div>
    <div><Medal className={`mx-auto size-8 ${style.accent}`} /><p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">{style.label}</p></div>
    <Avatar result={result} large />
    <div className="w-full"><h3 className="font-display text-2xl font-800 text-primary">{result.name}</h3><p className="mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">{result.indexNumber || 'Index number pending'}</p><div className="mt-4 flex justify-center"><ResultBadges result={result} /></div><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{result.remarks}</p></div>
    <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${style.badge}`}>{rank === 1 ? 'Top performer' : 'Podium finish'}</span>
  </article>
}

function CompactCard({ result, rank }: { result: PleResult; rank: number }) {
  return <article className="flex min-w-0 flex-col rounded-2xl bg-card p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"><div className="flex items-center gap-3"><Avatar result={result} /><div className="min-w-0"><p className="text-xs font-black uppercase tracking-wider text-accent">Rank #{rank}</p><h3 className="truncate font-display text-lg font-800 text-primary">{result.name}</h3></div></div><div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground"><span className="truncate">{result.indexNumber || 'Index pending'}</span><span className="text-right">{result.gender}</span></div><div className="mt-3"><ResultBadges result={result} /></div><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{result.remarks}</p></article>
}

function MobileResultsCarousel({ results, startRank = 4 }: { results: PleResult[]; startRank?: number }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const move = (direction: 'next' | 'previous') => {
    setActiveIndex((currentIndex) => {
      if (direction === 'next') return Math.min(results.length - 1, currentIndex + 1)
      return Math.max(0, currentIndex - 1)
    })
  }

    return <div className="relative sm:hidden">
    <div className="overflow-hidden">
      <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {results.map((result, index) => {
          const rank = startRank + index
          return <div key={`${result.indexNumber}-${result.name}`} className="w-full shrink-0 px-1"><CompactCard result={result} rank={rank} /></div>
        })}
      </div>
    </div>
    <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2">
      <button type="button" onClick={() => move('previous')} disabled={activeIndex === 0} aria-label="Previous learner" className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm transition hover:bg-accent active:scale-90 disabled:pointer-events-none disabled:opacity-25">
        <ChevronLeft className="size-5" />
      </button>
      <p className="min-w-0 truncate text-center text-[11px] font-semibold text-muted-foreground">Pupil {activeIndex + 1} of {results.length}</p>
      <button type="button" onClick={() => move('next')} disabled={activeIndex === results.length - 1} aria-label="Next learner" className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm transition hover:bg-accent active:scale-90 disabled:pointer-events-none disabled:opacity-25">
        <ChevronRight className="size-5" />
      </button>
    </div>
  </div>
}

function MobileTopThree({ results }: { results: PleResult[] }) {
  return <div className="rounded-3xl bg-card p-4 shadow-sm lg:hidden"><div className="mb-3 flex items-center gap-2"><Trophy className="size-5 text-primary" /><h2 className="font-display text-lg font-800 text-primary">Top three performers</h2></div><div className="divide-y divide-muted">{results.slice(0, 3).map((result, index) => <div key={`${result.indexNumber}-${result.name}`} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-black text-primary">#{index + 1}</span><Avatar result={result} /><div className="min-w-0 flex-1"><h3 className="truncate font-display text-base font-800 text-primary">{result.name}</h3><p className="truncate text-xs text-muted-foreground">{result.indexNumber || 'Index number pending'} · {result.division}</p></div><span className="shrink-0 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">{result.aggregate}</span></div>)}</div></div>
}

export function AcademicPerformance({ initialResults = [] }: AcademicPerformanceProps) {
  const [results, setResults] = useState(initialResults)
  const [loading, setLoading] = useState(!initialResults.length)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [genderFilter, setGenderFilter] = useState('all')
  const [divisionFilter, setDivisionFilter] = useState('all')
  const [page, setPage] = useState(1)

  const cardsPerPage = 8

  useEffect(() => {
    let isMounted = true
    let lastRequestAt = 0
    let requestInFlight = false
    const loadResults = async () => {
      const now = Date.now()
      if (requestInFlight || now - lastRequestAt < 60000) return
      lastRequestAt = now
      requestInFlight = true
      try {
        const response = await fetch('/api/ple-results', { cache: 'no-store' })
        const payload = await response.json()
        if (!response.ok) throw new Error(payload.error || 'Unable to load PLE results.')
        if (!Array.isArray(payload.results) || payload.results.length === 0) {
          throw new Error('The results sheet returned no usable records.')
        }
        if (!isMounted) return
        setResults(payload.results ?? [])
        setLastUpdated(payload.updatedAt ?? new Date().toISOString())
        setError('')
      } catch (loadError) {
        if (isMounted) setError(loadError instanceof Error ? loadError.message : 'PLE results are temporarily unavailable.')
      } finally {
        requestInFlight = false
        if (isMounted) setLoading(false)
      }
    }
    loadResults()
    const intervalId = window.setInterval(loadResults, 60000)
    const refreshOnFocus = () => loadResults()
    const refreshOnVisibility = () => { if (!document.hidden) loadResults() }
    window.addEventListener('focus', refreshOnFocus)
    document.addEventListener('visibilitychange', refreshOnVisibility)
    return () => { isMounted = false; window.clearInterval(intervalId); window.removeEventListener('focus', refreshOnFocus); document.removeEventListener('visibilitychange', refreshOnVisibility) }
  }, [initialResults.length])

  const directoryResults = results.slice(3)
  const genderOptions = Array.from(new Set(directoryResults.map((result) => result.gender).filter(Boolean))).sort()
  const divisionOptions = Array.from(new Set(directoryResults.map((result) => result.division).filter(Boolean))).sort()
  const normalizedSearch = searchTerm.trim().toLowerCase()
  const filteredResults = directoryResults.filter((result) => {
    const matchesSearch = !normalizedSearch || `${result.name} ${result.indexNumber}`.toLowerCase().includes(normalizedSearch)
    const matchesGender = genderFilter === 'all' || result.gender === genderFilter
    const matchesDivision = divisionFilter === 'all' || result.division === divisionFilter
    return matchesSearch && matchesGender && matchesDivision
  })
  const totalPages = Math.max(1, Math.ceil(filteredResults.length / cardsPerPage))
  const batchStart = (page - 1) * cardsPerPage
  const visibleResults = filteredResults.slice(batchStart, batchStart + cardsPerPage)

  useEffect(() => {
    setPage((currentPage) => currentPage > totalPages ? totalPages : currentPage)
  }, [totalPages])

  if (loading) return <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground"><Loader2 className="size-5 animate-spin text-primary" />Loading the latest PLE results...</div>
  if (!results.length) return <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900"><AlertCircle className="mt-0.5 size-5 shrink-0 text-amber-700" /><p>{error || 'PLE results are not available yet. Please check back later or contact the school office.'}</p></div>

  return <div className="space-y-8">
    <div className="flex flex-col gap-3 rounded-2xl bg-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between">
    <p className="text-sm text-muted-foreground">Results update automatically as the school sheet changes.</p><span className="inline-flex items-center gap-2 text-xs font-bold text-primary"><RefreshCw className="size-4" />{lastUpdated ? `Updated ${new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Live results'}</span></div>{error && <div className="flex items-center gap-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900"><AlertCircle className="size-5 shrink-0" />{error} Showing the last successful update.</div>}<MobileTopThree results={results} /><div className="hidden gap-5 lg:grid lg:grid-cols-3">{results.slice(0, 3).map((result, index) => <PodiumCard key={`${result.indexNumber}-${result.name}`} result={result} rank={index + 1} />)}</div>{directoryResults.length > 0 && <section aria-labelledby="results-directory-heading" className="space-y-5"><div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-accent">Full results directory</p><h2 id="results-directory-heading" className="font-display text-2xl font-800 text-primary">Every learner, easy to find</h2></div><p className="text-sm text-muted-foreground">{filteredResults.length} of {directoryResults.length} learners</p></div><div className="grid gap-3 rounded-2xl bg-muted/40 p-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:p-4"><label className="relative block"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><span className="sr-only">Search learners</span><input value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value); setPage(1) }} placeholder="Search by name or index number" className="h-11 w-full rounded-xl bg-card pl-10 pr-3 text-sm text-foreground outline-none ring-primary transition focus:ring-2" /></label><select value={genderFilter} onChange={(event) => { setGenderFilter(event.target.value); setPage(1) }} aria-label="Filter by gender" className="h-11 rounded-xl bg-card px-3 text-sm text-foreground outline-none ring-primary focus:ring-2"><option value="all">All genders</option>{genderOptions.map((gender) => <option key={gender} value={gender}>{gender}</option>)}</select><select value={divisionFilter} onChange={(event) => { setDivisionFilter(event.target.value); setPage(1) }} aria-label="Filter by division" className="h-11 rounded-xl bg-card px-3 text-sm text-foreground outline-none ring-primary focus:ring-2"><option value="all">All divisions</option>{divisionOptions.map((division) => <option key={division} value={division}>{division}</option>)}</select></div>{visibleResults.length > 0 ? <><MobileResultsCarousel key={page} results={visibleResults} /><div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">{visibleResults.map((result) => { const rank = results.indexOf(result) + 1; return <CompactCard key={`${result.indexNumber}-${result.name}`} result={result} rank={rank} /> })}</div></> : <div className="rounded-2xl bg-muted/30 p-8 text-center text-sm text-muted-foreground">No learners match those filters.</div>}<div className="flex flex-col items-center justify-between gap-3 pt-4 sm:flex-row"><p className="text-xs text-muted-foreground">Batch {page} of {totalPages} · Showing {visibleResults.length} learners</p><div className="flex items-center gap-2"><button type="button" onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))} disabled={page === 1} aria-label="Previous batch" className="grid size-10 place-items-center rounded-full bg-card text-primary shadow-sm transition hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-35"><ChevronLeft className="size-5" /></button><span className="min-w-16 text-center text-xs font-bold text-muted-foreground">{page} / {totalPages}</span><button type="button" onClick={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))} disabled={page === totalPages} aria-label="Next batch" className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm transition hover:bg-accent disabled:pointer-events-none disabled:opacity-35"><ChevronRight className="size-5" /></button></div></div></section>}<div className="flex items-center gap-2 text-xs text-muted-foreground">
    <Trophy className="size-4 text-primary" />Rankings use the lowest aggregate score as the highest achievement.</div></div>
}