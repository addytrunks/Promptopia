import Link from "next/link"

const Form = ({type,submitting,handleSubmit,post,setPost}) => {
  return (
    <section className="w-full max-w-full flex-col flex-start">
      <h1 className="head_text text-left"><span className="blue_gradient">{type}</span> Post</h1>
      <p className="desc text-left max-w-md">{type} and share amazing prompts with the world, and let your imagination run wild</p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
          <textarea value={post.prompt} onChange={(e) => setPost({...post,prompt:e.target.value})} placeholder="Write your prompt here" required className="form_textarea"></textarea>

        </label>

        
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Tags</span>
          <input value={post.tag} onChange={(e) => setPost({...post,tag:e.target.value})} placeholder="#tags" required className="form_input"></input>
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link className="text-gray-500 text-sm" href='/'>Cancel</Link> 
          <button type="submit" className="text-sm bg-primary-orange rounded-full text-white px-5 py-1.5" disabled={submitting}>{submitting?`${type}...`:type}</button> 
        </div>        

      </form>
    </section>
  )
}

export default Form