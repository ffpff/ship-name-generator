import NameGeneratorForm from './components/NameGeneratorForm';

export default function Home() {
  return (
    <main className="py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-deep-blue mb-3">
          Ship Name Generator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Create the perfect name for your vessel by combining your names and selecting a style.
        </p>
      </header>

      <section className="mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-deep-blue mb-4">
                How It Works
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-ocean-blue text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">Enter Your Names</h3>
                    <p className="text-gray-600">
                      Input both of your names in the fields below to personalize your ship name.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-ocean-blue text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">Select a Style</h3>
                    <p className="text-gray-600">
                      Choose from our selection of themed styles to match your preferences.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-ocean-blue text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">Generate Your Ship Name</h3>
                    <p className="text-gray-600">
                      Click the button and our AI will create the perfect name for your vessel.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <NameGeneratorForm />
          
        </div>
      </section>
    </main>
  );
} 