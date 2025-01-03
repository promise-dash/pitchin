"use client";

import React, { useActionState } from 'react'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { createStartup } from '@/lib/actions';

const StartupForm = () => {

  const [state, formAction, isPending] = useActionState(createStartup, {
    success: false,
    error: false,
  });

  return (
    <form className="startup-form"  action={(formData) =>
      formAction({formData})
    }>
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, Education...)"
        />

      </div>

      <div>
        <label htmlFor="img" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="img"
          name="img"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <Textarea
          id="pitch"
          name="pitch"
          className="startup-form_textarea"
          required
          placeholder="Your pitch"
        />
        
      </div>

     <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  )
}

export default StartupForm