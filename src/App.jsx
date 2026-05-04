import { useEffect, useMemo, useState } from 'react'

const baseWords = [
  'abound',
  'amorphous',
  'austere',
  'belie',
  'capricious',
  'cerebral',
  'congenial',
  'conspicuous',
  'cursory',
  'daunting',
  'deify',
  'didactic',
  'disseminate',
  'feasible',
  'flout',
  'homogeneous',
  'humdrum',
  'insipid',
  'loquacious',
  'misanthropic',
  'misnomer',
  'negligent',
  'obsequious',
  'placate',
  'proclivity',
  'puerile',
  'quixotic',
  'spendthrift',
  'taciturn',
  'wary',
]

const groups = Array.from({ length: 5 }, (_, groupIndex) => {
  const groupId = groupIndex + 1
  return {
    id: groupId,
    words: baseWords.map((word, wordIndex) => ({
      text: groupId === 1 ? word : `${word} ${groupId}`,
      selected: groupId === 1 && wordIndex === 0,
      badge:
        groupId === 1 &&
        (word === 'austere' || word === 'cerebral' || word === 'congenial')
          ? 2
          : undefined,
    })),
  }
})

function KeyBadge({ children, label, className = '' }) {
  return (
    <div className="flex min-w-[74px] flex-col items-center gap-2 text-center">
      <div
        className={`flex h-12 min-w-[48px] items-center justify-center rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 shadow-[0_2px_0_rgba(148,163,184,0.35)] ${className}`}
      >
        {children}
      </div>
      <span className="text-xs font-medium text-slate-500">{label}</span>
    </div>
  )
}

function ArrowCluster() {
  return (
    <div className="grid grid-cols-3 gap-1">
      <span />
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white text-xs shadow-sm">
        ↑
      </span>
      <span />
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white text-xs shadow-sm">
        ←
      </span>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white text-xs shadow-sm">
        ↓
      </span>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white text-xs shadow-sm">
        →
      </span>
    </div>
  )
}

function ToggleRow({ label, enabled }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div
        className={`flex h-7 w-12 items-center rounded-full p-1 transition ${
          enabled ? 'bg-blue-500' : 'bg-slate-300'
        }`}
      >
        <div
          className={`h-5 w-5 rounded-full bg-white shadow-sm transition ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
    </div>
  )
}

function GroupNavigator({ selectedGroup, onGroupChange }) {
  const handlePrev = () => onGroupChange(Math.max(1, selectedGroup - 1))
  const handleNext = () => onGroupChange(Math.min(5, selectedGroup + 1))

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={handlePrev}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-lg text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          ←
        </button>
        <p className="text-sm font-semibold text-slate-700">Group {selectedGroup} of 5</p>
        <select
          value={selectedGroup}
          onChange={(event) => onGroupChange(Number(event.target.value))}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button
          type="button"
          onClick={handleNext}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-lg text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          →
        </button>
      </div>
      <div className="relative h-2 rounded-full bg-slate-100">
        <div
          className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-blue-500 transition-all"
          style={{ left: `${((selectedGroup - 1) / 4) * 100}%` }}
        />
      </div>
    </div>
  )
}

function MiniKey({ children, className = '' }) {
  return (
    <span
      className={`inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-slate-300 bg-slate-100 px-2 text-xs font-semibold text-slate-700 shadow-sm ${className}`}
    >
      {children}
    </span>
  )
}

function DefinitionPopup({ word, onClose }) {
  return (
    <section className="flex h-[70vh] w-[50vw] min-w-[720px] flex-col rounded-2xl border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900">{word || 'deify'}</h3>
          <MiniKey>S</MiniKey>
          <button type="button" className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-slate-300 bg-slate-100 text-xs text-slate-700 shadow-sm">
            🔊
          </button>
        </div>
        <div className="flex items-center gap-2">
          <MiniKey>D</MiniKey>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-slate-300 bg-slate-100 px-2 text-xs font-semibold text-slate-700 shadow-sm"
          >
            X
          </button>
        </div>
      </div>

      <div className="border-y border-slate-200 bg-slate-50 px-4 py-3">
        <div className="grid grid-cols-5 gap-2">
          <button type="button" className="flex h-12 w-full items-center justify-center gap-1 rounded-lg border border-emerald-300 bg-emerald-100 px-2 text-xs font-semibold text-emerald-800">
            <MiniKey className="h-5 min-w-5 border-emerald-300 bg-emerald-50 text-emerald-700">G</MiniKey>
            I knew
          </button>
          <button type="button" className="flex h-12 w-full items-center justify-center gap-1 rounded-lg border border-rose-300 bg-rose-100 px-2 text-xs font-semibold text-rose-800">
            <MiniKey className="h-5 min-w-5 border-rose-300 bg-rose-50 text-rose-700">R</MiniKey>
            I forgot
          </button>
          <button type="button" className="flex h-12 w-full items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white px-2 text-xs font-semibold text-slate-700">
            <MiniKey className="h-5 min-w-5">W</MiniKey>
            Reset
          </button>
          <button type="button" className="flex h-12 w-full items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white px-2 text-xs font-semibold text-slate-700">
            <MiniKey className="h-5 min-w-5">↑</MiniKey>
            Previous
          </button>
          <button type="button" className="flex h-12 w-full items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white px-2 text-xs font-semibold text-slate-700">
            <MiniKey className="h-5 min-w-5">↓</MiniKey>
            Next
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <p className="text-sm font-bold text-slate-800">verb:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>look up to someone or something as a god</li>
        </ul>
        <p className="mt-3 text-sm italic text-slate-600">
          In some ancient cultures, the sun was <span className="underline">deified</span> and worshiped.
        </p>
        <p className="mt-4 text-sm font-bold text-[#a855f7]">Synonyms:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>venerate</li>
          <li>lionize</li>
          <li>exalt</li>
        </ul>
      </div>

      <div className="border-t border-slate-200 px-5 py-4">
        <textarea
          className="h-28 w-full resize-none rounded-lg border border-slate-200 p-3 font-mono text-sm outline-none"
          placeholder="Write notes here..."
        />
      </div>
    </section>
  )
}

function App() {
  const [selectedGroup, setSelectedGroup] = useState(1)
  const [activeWordId, setActiveWordId] = useState('1-abound')
  const [openDefinitionWordId, setOpenDefinitionWordId] = useState(null)
  const [wordStatuses, setWordStatuses] = useState({})
  const [lastActionKey, setLastActionKey] = useState(null)

  const visibleWords = useMemo(
    () =>
      groups
        .filter((group) => group.id <= selectedGroup)
        .flatMap((group) =>
          group.words.map((word, index) => ({
            id: `${group.id}-${word.text}`,
            text: word.text,
            groupId: group.id,
            badge: word.badge,
            baseSelected: word.selected,
            index,
          })),
        ),
    [selectedGroup],
  )

  useEffect(() => {
    if (visibleWords.length === 0) return
    const hasActiveVisible = visibleWords.some((word) => word.id === activeWordId)
    if (!hasActiveVisible) {
      setActiveWordId(visibleWords[0].id)
    }
  }, [activeWordId, visibleWords])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) {
        return
      }

      const currentIndex = visibleWords.findIndex((word) => word.id === activeWordId)
      const safeIndex = currentIndex >= 0 ? currentIndex : 0

      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault()
        const nextIndex = Math.min(visibleWords.length - 1, safeIndex + 1)
        setActiveWordId(visibleWords[nextIndex].id)
        return
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault()
        const prevIndex = Math.max(0, safeIndex - 1)
        setActiveWordId(visibleWords[prevIndex].id)
        return
      }

      if (event.key.toLowerCase() === 'd' && activeWordId) {
        event.preventDefault()
        setOpenDefinitionWordId((current) => (current === activeWordId ? null : activeWordId))
        return
      }

      if (event.key.toLowerCase() === 'g' && activeWordId) {
        event.preventDefault()
        setWordStatuses((current) => ({ ...current, [activeWordId]: 'known' }))
        setLastActionKey('g')
        return
      }

      if (event.key.toLowerCase() === 'r' && activeWordId) {
        event.preventDefault()
        setWordStatuses((current) => ({ ...current, [activeWordId]: 'forgot' }))
        setLastActionKey('r')
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeWordId, visibleWords])

  const popupWord =
    visibleWords.find((word) => word.id === openDefinitionWordId)?.text || 'deify'

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-4 lg:grid-cols-[55%_45%]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap gap-5">
              <KeyBadge label="Navigation">
                <ArrowCluster />
              </KeyBadge>
              <KeyBadge label="Definition">D</KeyBadge>
              <KeyBadge
                label="I knew this"
                className={
                  lastActionKey === 'g'
                    ? 'border-emerald-500 bg-emerald-300 text-emerald-900'
                    : 'border-emerald-300 bg-emerald-100 text-emerald-700'
                }
              >
                G
              </KeyBadge>
              <KeyBadge
                label="I forgot this"
                className={
                  lastActionKey === 'r'
                    ? 'border-rose-500 bg-rose-300 text-rose-900'
                    : 'border-rose-300 bg-rose-100 text-rose-700'
                }
              >
                R
              </KeyBadge>
              <KeyBadge label="Reset">W</KeyBadge>
              <KeyBadge label="Speak" className="border-amber-300 bg-amber-100 text-amber-700">
                S
              </KeyBadge>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <select className="min-w-[180px] rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none">
                <option>Show All</option>
                <option>Show Red Only</option>
                <option>Show Green Only</option>
                <option>Show Items with Notes Only</option>
              </select>
              <select className="min-w-[180px] rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none">
                <option>Default Order</option>
                <option>Shuffle Everything</option>
                <option>Shuffle Within Groups</option>
                <option>Sort Everything Alphabetically</option>
              </select>
              <button type="button" className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-500 shadow-sm transition hover:bg-slate-50">
                ↺
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-[60%_40%]">
              <div className="space-y-4 rounded-2xl border border-slate-200 p-4">
                <ToggleRow label="Close Definition on Navigation" enabled />
                <ToggleRow label="Center Definition" enabled={false} />
                <ToggleRow label="Show Previous Day Color" enabled />
              </div>
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 p-2">
                <button type="button" className="rounded-xl bg-rose-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600">
                  Reset Everything
                </button>
                <button type="button" className="rounded-xl bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600">
                  Reset Day 1
                </button>
                <button type="button" className="rounded-xl bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600">
                  Options
                </button>
              </div>
            </div>
          </div>
        </section>

        <main className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <GroupNavigator selectedGroup={selectedGroup} onGroupChange={setSelectedGroup} />

          <div className="border-b border-slate-100 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              {groups.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setSelectedGroup(group.id)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                    group.id === selectedGroup
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Group {group.id}
                </button>
              ))}
            </div>
            <button type="button" className="mt-2 inline-block text-left text-sm font-semibold text-blue-600 hover:text-blue-700">
              Take Test 1
            </button>
          </div>

          <div className="mt-5">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
              {groups.map((group) => {
                const isVisible = group.id <= selectedGroup

                return (
                  isVisible ? (
                    <div key={group.id} className="rounded-2xl border border-slate-200 p-3">
                      <h2 className="mb-3 text-sm font-semibold text-slate-700">Group {group.id}</h2>
                      <div className="space-y-2">
                        {group.words.map((word, wordIndex) => {
                          const wordId = `${group.id}-${word.text}`
                          const isActive = wordId === activeWordId
                          const status = wordStatuses[wordId]

                          return (
                            <button
                              type="button"
                              key={word.text}
                              onMouseEnter={() => setActiveWordId(wordId)}
                              onFocus={() => setActiveWordId(wordId)}
                              onDoubleClick={() => setOpenDefinitionWordId(wordId)}
                              className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left transition ${
                                status === 'known'
                                  ? 'border-emerald-300 bg-emerald-100'
                                  : status === 'forgot'
                                    ? 'border-rose-300 bg-rose-100'
                                    : isActive || word.selected || (group.id === 1 && wordIndex === 0)
                                      ? 'border-blue-300 bg-blue-50 shadow-sm'
                                      : 'border-transparent bg-white hover:border-slate-200 hover:bg-slate-50'
                              } ${isActive ? 'ring-2 ring-blue-100' : ''}`}
                            >
                              <span className="text-sm font-medium text-slate-800">{word.text}</span>
                              {word.badge ? (
                                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                                  ({word.badge})
                                </span>
                              ) : null}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ) : (
                    <div key={group.id} className="rounded-2xl p-3" />
                  )
                )
              })}
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <GroupNavigator selectedGroup={selectedGroup} onGroupChange={setSelectedGroup} />
          </div>
        </main>
      </div>

      {openDefinitionWordId ? (
        <div className="pointer-events-none fixed inset-0 z-50">
          <div className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <DefinitionPopup
              word={popupWord}
              onClose={() => setOpenDefinitionWordId(null)}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
