<template>
    <div @click.self="$emit('cancel')" class="z-40 max-w-full fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
        <div class="bg-white p-6 rounded-2xl shadow-lg text-center flex flex-col items-center justify-center gap-4">
            <h2 class="text-2xl font-bold ">Uygulamayı İndir</h2>
            <p class="mb-2 font-semibold text-second">Bu web uygulamasını cihazınıza yüklemek ister misiniz?</p>
            <div class="w-full flex justify-center items-center gap-4">
                <button @click="$emit('confirm')" class="w-20 py-1 bg-fourth border-2 border-fourth text-white text-[1.2rem] font-bold rounded">Evet</button>
                <button @click="$emit('cancel')" class="w-20 py-1 bg-white border-2 border-fourth text-fourth text-[1.2rem] font-bold rounded">Hayır</button>
            </div>
        </div>
    </div>
</template>