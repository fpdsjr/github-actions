interface LabelProps {
  htmlFor: string
  text: string
}

export function Label({ htmlFor, text }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {text}
    </label>
  )
}
