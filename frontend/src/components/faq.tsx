'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

const AccordionContext = createContext<{
  open: string | null;
  toggle: (id: string) => void;
}>({ open: null, toggle: () => {} });

export function FaqGroup({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <AccordionContext.Provider
      value={{ open, toggle: (id) => setOpen(open === id ? null : id) }}
    >
      <div className="accordion accordion-flush" id={id}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function FaqItem({
  id,
  question,
  children,
}: {
  id: string;
  question: string;
  children: ReactNode;
}) {
  const { open, toggle } = useContext(AccordionContext);
  const expanded = open === id;
  const number = id.replace('faq-answer-', '');
  const questionId = `faq-question-${number}`;
  return (
    <div className="accordion-item">
      <h4 className="accordion-header">
        <button
          className={`accordion-button${expanded ? '' : ' collapsed'}`}
          type="button"
          aria-expanded={expanded}
          aria-controls={id}
          id={questionId}
          onClick={() => toggle(id)}
        >
          {question}
        </button>
      </h4>
      <div
        id={id}
        className={`accordion-collapse collapse${expanded ? ' show' : ''}`}
        aria-labelledby={questionId}
      >
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
}
