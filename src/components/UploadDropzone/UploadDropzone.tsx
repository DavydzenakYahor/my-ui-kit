import { useState, useRef, useCallback, useId, useEffect } from 'react'
import './UploadDropzone.css'

type FileStatus = 'pending' | 'uploading' | 'done'

interface UploadEntry {
  id: string
  file: File
  progress: number
  status: FileStatus
}

interface UploadDropzoneProps {
  /** UI color theme */
  theme?: 'light' | 'dark'
  /** Accept attribute forwarded to the hidden file input, e.g. ".pdf,image/*" */
  accept?: string
  /** Allow selecting multiple files */
  multiple?: boolean
  /** Pre-populate the dropzone with files and start the upload simulation immediately */
  initialFiles?: File[]
  /** Simulated upload duration per file in seconds */
  uploadSeconds?: number
  /** Called with all files once the upload simulation completes */
  onUpload?: (files: File[]) => void
}

const TICK_MS = 50

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const createEntry = (file: File): UploadEntry => ({
  id: Math.random().toString(36).slice(2),
  file,
  progress: 0,
  status: 'pending',
})

const FILE_ICON_COLORS: Record<string, string> = {
  pdf: '#E0526B',
  jpg: '#5B5BD6',
  jpeg: '#5B5BD6',
  png: '#5B5BD6',
  gif: '#5B5BD6',
  svg: '#5B5BD6',
  csv: '#2E9E8F',
  xlsx: '#2E9E8F',
  xls: '#2E9E8F',
  zip: '#9A958B',
  mp4: '#FF7A3D',
}

const getExtension = (name: string) => (name.split('.').pop() || '').toLowerCase()

const FileIcon = ({ name }: { name: string }) => {
  const ext = getExtension(name)
  const color = FILE_ICON_COLORS[ext] || '#9A958B'

  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
      <rect width="38" height="38" rx="9" fill={color} fillOpacity="0.1" />
      <path
        d="M13 10h8l6 6v12a2 2 0 01-2 2H13a2 2 0 01-2-2V12a2 2 0 012-2z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M21 10v6h6" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export const UploadDropzone = ({
  theme = 'light',
  accept,
  multiple = true,
  initialFiles,
  uploadSeconds = 3,
  onUpload,
}: UploadDropzoneProps) => {
  const [entries, setEntries] = useState<UploadEntry[]>(() =>
    initialFiles ? initialFiles.map(createEntry) : []
  )
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  const intervalsRef = useRef<Map<string, ReturnType<typeof setInterval>>>(new Map())
  const initialEntriesRef = useRef(entries)
  const hasRunInitialSimulation = useRef(false)

  const runSimulation = useCallback((newEntries: UploadEntry[]) => {
    const ticksPerFile = (uploadSeconds * 1000) / TICK_MS
    let queue = [...newEntries]

    const uploadNext = () => {
      if (queue.length === 0) {
        if (onUpload) {
          onUpload(newEntries.map(entry => entry.file))
        }
        return
      }
      const current = queue[0]
      queue = queue.slice(1)
      let ticks = 0

      const interval = setInterval(() => {
        ticks++
        const progress = Math.min(100, (ticks / ticksPerFile) * 100)
        const isDone = ticks >= ticksPerFile

        setEntries(previous =>
          previous.map(entry =>
            entry.id === current.id
              ? { ...entry, progress, status: isDone ? 'done' : 'uploading' }
              : entry
          )
        )

        if (isDone) {
          clearInterval(interval)
          intervalsRef.current.delete(current.id)
          uploadNext()
        }
      }, TICK_MS)

      intervalsRef.current.set(current.id, interval)
    }

    uploadNext()
  }, [uploadSeconds, onUpload])

  useEffect(() => {
    const intervals = intervalsRef.current
    return () => {
      intervals.forEach(interval => clearInterval(interval))
      intervals.clear()
    }
  }, [])

  useEffect(() => {
    if (hasRunInitialSimulation.current || initialEntriesRef.current.length === 0) return
    hasRunInitialSimulation.current = true
    const timeout = setTimeout(() => runSimulation(initialEntriesRef.current), 0)
    return () => clearTimeout(timeout)
  }, [runSimulation])

  const addFiles = useCallback((files: File[]) => {
    const newEntries = files.map(createEntry)
    setEntries(previous => [...previous, ...newEntries])
    runSimulation(newEntries)
  }, [runSimulation])

  const removeEntry = (id: string) => {
    const interval = intervalsRef.current.get(id)
    if (interval) {
      clearInterval(interval)
      intervalsRef.current.delete(id)
    }
    setEntries(previous => previous.filter(entry => entry.id !== id))
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
    addFiles(Array.from(event.dataTransfer.files))
  }

  const handleDragEnter = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsDragging(false)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addFiles(Array.from(event.target.files))
      event.target.value = ''
    }
  }

  const allDone = entries.length > 0 && entries.every(entry => entry.status === 'done')

  return (
    <div
      className={[
        'udz-root',
        `udz-root--${theme}`,
        isDragging ? 'udz-root--dragging' : '',
      ].filter(Boolean).join(' ')}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={event => event.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        className="udz-input"
        aria-label="File upload"
        onChange={handleInputChange}
      />

      {entries.length === 0 ? (
        <label
          htmlFor={inputId}
          className="udz-zone"
          tabIndex={0}
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              inputRef.current?.click()
            }
          }}
        >
          <div className="udz-zone-icon-wrap" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 20V10M14 10L9 15M14 10L19 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M6 23h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="udz-zone-title">
            {isDragging ? 'Drop to upload' : 'Drag & drop files here'}
          </span>
          <span className="udz-zone-subtitle">
            or <span className="udz-zone-browse">click to browse</span>
          </span>
          {accept && (
            <span className="udz-zone-hint">{accept.replace(/,/g, ' · ')}</span>
          )}
        </label>
      ) : (
        <div className="udz-file-section">
          {allDone && (
            <div className="udz-banner udz-banner--success">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7l3 3L11.5 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All files uploaded successfully
            </div>
          )}

          <ul className="udz-list" role="list">
            {entries.map(entry => (
              <li key={entry.id} className="udz-row">
                <FileIcon name={entry.file.name} />
                <div className="udz-row-body">
                  <div className="udz-row-header">
                    <span className="udz-row-name" title={entry.file.name}>
                      {entry.file.name}
                    </span>
                    <span className="udz-row-size">{formatSize(entry.file.size)}</span>
                  </div>
                  <div className="udz-row-track">
                    <div className="udz-track-bg">
                      <div
                        className={`udz-track-fill${entry.status === 'done' ? ' udz-track-fill--done' : ''}`}
                        style={{ width: `${entry.progress}%` }}
                      />
                    </div>
                    {entry.status === 'done' ? (
                      <svg className="udz-icon-done" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-label="Done">
                        <path d="M2.5 7.5l3.5 3.5 6-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <span className="udz-percent">{Math.round(entry.progress)}%</span>
                    )}
                  </div>
                </div>
                <button
                  className="udz-remove"
                  aria-label={`Remove ${entry.file.name}`}
                  onClick={() => removeEntry(entry.id)}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <label htmlFor={inputId} className="udz-add-more">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
            Add more files
          </label>
        </div>
      )}
    </div>
  )
}
