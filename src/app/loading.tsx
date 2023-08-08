import GeneratorForm from "@/components/GeneratorForm/GeneratorForm"

const Loading = () => (
  <main className="content flex-grow grid content-start gap-4 items-center p-4">
    <GeneratorForm/>
    <p className="loader text-fluid-3 font-bold leading-none text-center">
      AI can be a little hit or miss but robots are working hard to generate a color palette for you...
    </p>
  </main>
)
export default Loading