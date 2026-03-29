<template>
    <div>
        <label>{{ props.label }}</label>
        <div id="picker-map" class="h-64 w-full rounded-lg mb-4 z-0"></div>
        <div v-if="coords" class="text-xs font-mono text-gray-500 mt-1">
      Kiválasztva: {{ coords[0].toFixed(4) }}, {{ coords[1].toFixed(4) }}
    </div>
    <p v-if="errorMessage" class="text-red-500 text-xs mt-1">{{ errorMessage }}</p>
    </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { onMounted, ref,  watch, } from 'vue';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
interface Props {
    label: string,
    name: string,
    initalCenter?:Array<[number,number]>
    validator?:any
}

const props = defineProps<Props>()
const labelClass = ref<string>('text-zinc-600')
const inputClass = ref<string>('text-zinc-600')

let map: L.Map | null=null
let marker:L.Marker | null=null

const { value:coords, errorMessage, validate } = useField<[number,number]>(props.name,props.validator)
onMounted(()=>{

    const startprop=props.initalCenter || [47,19]
    
    map=L.map('picker-map').setView(startprop,13)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png').addTo(map);
    map.on('click',(e: L.LeafletMouseEvent)=>{
        const {lat,lon}=e.Latlng
        coords.value=[lat,lon]

        if (marker) {
            marker.setLatLng(e.Latlng)
        } else{
            marker=L.marker(e.Latlng).addTo(map!)
        }
    }
)})






watch(errorMessage, (error) => {
    if (error) {
        labelClass.value = 'text-red-500';
        inputClass.value = 'border-red-500 bg-red-50';
    } else if (coords.value) {
        labelClass.value = 'text-green-700';
        inputClass.value = 'border-green-500 bg-green-50';
    } else {
        labelClass.value = 'text-zinc-600';
        inputClass.value = 'border-zinc-300';
    }
});


const handleBlur = () => validate();
</script>

<style scoped></style>