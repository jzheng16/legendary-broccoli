export default async function FeatureList() {
  return (
    <div class="bg-indigo-600 py-10 sm:py-10">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base font-semibold leading-7 text-indigo-200">Challenge your friends</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Multiplayer Quiz App Features</p>
        <p class="mt-6 text-lg leading-8 text-indigo-200">Experience the thrill of multiplayer quizzes with these exciting features</p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          <div class="flex flex-col">
            <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">Real-time multiplayer</dt>
            <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-indigo-200">
              <p class="flex-auto">Compete against friends or random players in real-time quizzes</p>
              <p class="mt-6">
                <a href="#" class="text-sm font-semibold leading-6 text-white">Learn more <span aria-hidden="true">→</span></a>
              </p>
            </dd>
          </div>
          <div class="flex flex-col">
            <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">Wide range of categories</dt>
            <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-indigo-200">
              <p class="flex-auto">Choose from a variety of categories to test your knowledge</p>
              <p class="mt-6">
                <a href="#" class="text-sm font-semibold leading-6 text-white">Learn more <span aria-hidden="true">→</span></a>
              </p>
            </dd>
          </div>
          <div class="flex flex-col">
            <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">Leaderboards and achievements</dt>
            <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-indigo-200">
              <p class="flex-auto">Track your progress and compete for the top spot on the leaderboards</p>
              <p class="mt-6">
                <a href="#" class="text-sm font-semibold leading-6 text-white">Learn more <span aria-hidden="true">→</span></a>
              </p>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
  )
}