<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Fifty / Fifty - Pick deal') }}
        </h2>
    </x-slot>

    <div class="py-12">
        @if(session('won'))
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col pb-8">
                <div class="flex items-center justify-between px-4 py-4 rounded text-white bg-green-800"
                     role="alert">
                    <p>{{ session('won') }}</p>
                </div>
            </div>
        @endif

        @if(session('lost'))
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col pb-8">
                <div class="flex items-center justify-between px-4 py-4 rounded text-white bg-red-800"
                     role="alert">
                    <p>{{ session('lost') }}</p>
                </div>
            </div>
        @endif

        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col">
            @foreach ($items as $item)
                <div class="sm:flex sm:items-center sm:justify-between sm:space-x-5 mb-4 rounded-md border border-gray-300 hover:border-gray-300">
                    <div class="flex items-center flex-1 min-w-0">
                        <div class="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0 py-2">
                            <div class="space-y-0.5">
                                <p class="text-lg font-bold text-gray-800 truncate">{{ $item->title }}</p>
                                <p class="text-sm font-light">
                                    ID: {{ $item->id }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        class="items-center pr-4">
                        <form method="POST" action={{ route('deal.pick', ['id' => $item->id]) }}>
                            @csrf
                            <button
                                class="px-4 py-1 text-sm text-sky-600 font-semibold rounded-full border border-gray-300 hover:text-white hover:bg-sky-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2"
                                type="submit"
                            >
                                Pick
                            </button>
                        </form>
                    </div>
                </div>
            @endforeach

        </div>
    </div>
</x-app-layout>
