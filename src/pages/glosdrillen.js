import React, { useState, useRef, useEffect } from 'react';
import Layout from '@theme/Layout';
import styles from './glosdrilla.module.css';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const ACCENT_CHARS = ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü'];

const TYPE_LABEL = {
  subst: 'subst.', verb: 'verb', adj: 'adj.',
  adv: 'adv.', konj: 'konj.', prep: 'prep.',
  interj: 'interj.', pron: 'pron.', uttr: 'uttryck',
};

// ─── DECK DATA  (kortlek 1–15, 750 glosor) ───────────────────────────────────

const DECKS = [

  // ══════════════════════════════════════════════════
  //  ABSOLUT NYBÖRJARE  (kortlek 1–3)
  // ══════════════════════════════════════════════════

  {
    id: 1, level: 'Absolut nybörjare', theme: 'Grundläggande ord',
    words: [
      { sv: 'hus',                       es: 'casa',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'skola',                     es: 'escuela',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'kompis / vän (m)',           es: 'amigo',      article: 'el', type: 'subst', gender: 'm', note: 'amiga (f)' },
      { sv: 'familj',                    es: 'familia',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'mamma / mor',               es: 'madre',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'pappa / far',               es: 'padre',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'bror',                      es: 'hermano',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'syster',                    es: 'hermana',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'hund',                      es: 'perro',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'katt',                      es: 'gato',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'bok',                       es: 'libro',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'bord',                      es: 'mesa',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'stol',                      es: 'silla',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'stad',                      es: 'ciudad',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'gata',                      es: 'calle',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'vatten',                    es: 'agua',       article: 'el', type: 'subst', gender: 'f', note: 'el agua (undantag — femininum)' },
      { sv: 'mat',                       es: 'comida',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'dag',                       es: 'día',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'natt',                      es: 'noche',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'år',                        es: 'año',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'hand',                      es: 'mano',       article: 'la', type: 'subst', gender: 'f', note: 'la mano (undantag — femininum)' },
      { sv: 'öga',                       es: 'ojo',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'namn',                      es: 'nombre',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'nummer / siffra',           es: 'número',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'arbete / jobb',             es: 'trabajo',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'pengar',                    es: 'dinero',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'telefon',                   es: 'teléfono',   article: 'el', type: 'subst', gender: 'm' },
      { sv: 'dörr',                      es: 'puerta',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'fönster',                   es: 'ventana',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'land / nation',             es: 'país',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'vara (bestående egenskap)', es: 'ser',    type: 'verb' },
      { sv: 'ha / äga',                  es: 'tener',  type: 'verb' },
      { sv: 'gå / åka',                  es: 'ir',     type: 'verb' },
      { sv: 'göra',                      es: 'hacer',  type: 'verb' },
      { sv: 'vilja / tycka om',          es: 'querer', type: 'verb' },
      { sv: 'stor',        es: 'grande',  type: 'adj' },
      { sv: 'liten',       es: 'pequeño', type: 'adj', note: 'pequeña (f)' },
      { sv: 'bra / god',   es: 'bueno',   type: 'adj', note: 'buena (f)' },
      { sv: 'dålig / ond', es: 'malo',    type: 'adj', note: 'mala (f)' },
      { sv: 'ny',          es: 'nuevo',   type: 'adj', note: 'nueva (f)' },
      { sv: 'idag',               es: 'hoy',     type: 'adv' },
      { sv: 'imorgon / morgon',   es: 'mañana',  type: 'adv' },
      { sv: 'ja',                 es: 'sí',      type: 'interj' },
      { sv: 'nej',                es: 'no',      type: 'interj' },
      { sv: 'och',                es: 'y',       type: 'konj' },
      { sv: 'men',                es: 'pero',    type: 'konj' },
      { sv: 'mycket (gradadv.)',  es: 'muy',     type: 'adv' },
      { sv: 'bra / väl (adv.)',  es: 'bien',    type: 'adv' },
      { sv: 'här',                es: 'aquí',    type: 'adv' },
      { sv: 'också / även',       es: 'también', type: 'adv' },
    ],
  },

  {
    id: 2, level: 'Absolut nybörjare', theme: 'Vardagsliv & omgivning',
    words: [
      { sv: 'lärare (m)',               es: 'profesor',    article: 'el', type: 'subst', gender: 'm', note: 'profesora (f)' },
      { sv: 'klass / lektion',          es: 'clase',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'läxor',                    es: 'deberes',     article: 'los',type: 'subst', gender: 'm', note: 'alltid plural' },
      { sv: 'kulspetspenna',            es: 'bolígrafo',   article: 'el', type: 'subst', gender: 'm' },
      { sv: 'häfte / anteckningsbok',   es: 'cuaderno',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'ryggsäck',                 es: 'mochila',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'rum',                      es: 'habitación',  article: 'la', type: 'subst', gender: 'f' },
      { sv: 'kök',                      es: 'cocina',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'badrum',                   es: 'baño',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'trädgård',                 es: 'jardín',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'bil',                      es: 'coche',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'buss',                     es: 'autobús',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'tåg',                      es: 'tren',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'flygplan',                 es: 'avión',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'butik / affär',            es: 'tienda',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'marknad',                  es: 'mercado',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'restaurang',               es: 'restaurante', article: 'el', type: 'subst', gender: 'm' },
      { sv: 'sjukhus',                  es: 'hospital',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'bank',                     es: 'banco',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'park',                     es: 'parque',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'strand',                   es: 'playa',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'berg',                     es: 'montaña',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'flod / å',                es: 'río',         article: 'el', type: 'subst', gender: 'm' },
      { sv: 'hav',                      es: 'mar',         article: 'el', type: 'subst', gender: 'm' },
      { sv: 'sol',                      es: 'sol',         article: 'el', type: 'subst', gender: 'm' },
      { sv: 'måne',                     es: 'luna',        article: 'la', type: 'subst', gender: 'f' },
      { sv: 'blomma',                   es: 'flor',        article: 'la', type: 'subst', gender: 'f' },
      { sv: 'träd',                     es: 'árbol',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'väder / tid',              es: 'tiempo',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'värld',                    es: 'mundo',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'prata / tala',  es: 'hablar', type: 'verb' },
      { sv: 'äta',           es: 'comer',  type: 'verb' },
      { sv: 'bo / leva',     es: 'vivir',  type: 'verb' },
      { sv: 'se / titta på', es: 'ver',    type: 'verb' },
      { sv: 'ge',            es: 'dar',    type: 'verb' },
      { sv: 'vacker / fin',  es: 'bonito', type: 'adj', note: 'bonita (f)' },
      { sv: 'ful',           es: 'feo',    type: 'adj', note: 'fea (f)' },
      { sv: 'lång / hög',    es: 'alto',   type: 'adj', note: 'alta (f)' },
      { sv: 'kort / låg',    es: 'bajo',   type: 'adj', note: 'baja (f)' },
      { sv: 'ung',           es: 'joven',  type: 'adj' },
      { sv: 'mycket (kvantitet)', es: 'mucho',   type: 'adv', note: 'mucha (f)' },
      { sv: 'lite (kvantitet)',   es: 'poco',    type: 'adv', note: 'poca (f)' },
      { sv: 'alltid',             es: 'siempre', type: 'adv' },
      { sv: 'aldrig',             es: 'nunca',   type: 'adv' },
      { sv: 'nu',                 es: 'ahora',   type: 'adv' },
      { sv: 'efteråt / sedan',    es: 'después', type: 'adv' },
      { sv: 'förut / innan',      es: 'antes',   type: 'adv' },
      { sv: 'för att / eftersom', es: 'porque',  type: 'konj' },
      { sv: 'där / dit',          es: 'allí',    type: 'adv' },
      { sv: 'att / som (konj.)',  es: 'que',     type: 'konj' },
    ],
  },

  {
    id: 3, level: 'Absolut nybörjare', theme: 'Kropp, kläder & mat',
    words: [
      { sv: 'huvud',               es: 'cabeza',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'ansikte',             es: 'cara',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'mun',                 es: 'boca',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'näsa',                es: 'nariz',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'öra (ytteröra)',      es: 'oreja',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'hår',                 es: 'pelo',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'fot',                 es: 'pie',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'ben (kroppsdel)',     es: 'pierna',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'arm',                 es: 'brazo',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'hjärta',              es: 'corazón',  article: 'el', type: 'subst', gender: 'm' },
      { sv: 'kläder',              es: 'ropa',     article: 'la', type: 'subst', gender: 'f', note: 'ej plural i spanskan' },
      { sv: 'skjorta',             es: 'camisa',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'byxor',               es: 'pantalón', article: 'el', type: 'subst', gender: 'm' },
      { sv: 'sko',                 es: 'zapato',   article: 'el', type: 'subst', gender: 'm' },
      { sv: 'kappa / rock',        es: 'abrigo',   article: 'el', type: 'subst', gender: 'm' },
      { sv: 'frukost',             es: 'desayuno', article: 'el', type: 'subst', gender: 'm' },
      { sv: 'lunch',               es: 'almuerzo', article: 'el', type: 'subst', gender: 'm' },
      { sv: 'middag (måltid)',     es: 'cena',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'bröd',                es: 'pan',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'mjölk',               es: 'leche',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'frukt',               es: 'fruta',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'grönsak',             es: 'verdura',  article: 'la', type: 'subst', gender: 'f' },
      { sv: 'kött',                es: 'carne',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'fisk (som mat)',      es: 'pescado',  article: 'el', type: 'subst', gender: 'm' },
      { sv: 'kyckling',            es: 'pollo',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'ris',                 es: 'arroz',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'kaffe',               es: 'café',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'öl',                  es: 'cerveza',  article: 'la', type: 'subst', gender: 'f' },
      { sv: 'vin',                 es: 'vino',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'juice',               es: 'zumo',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'dricka',        es: 'beber',    type: 'verb' },
      { sv: 'köpa',          es: 'comprar',  type: 'verb' },
      { sv: 'skriva',        es: 'escribir', type: 'verb' },
      { sv: 'läsa',          es: 'leer',     type: 'verb' },
      { sv: 'lyssna (på)',   es: 'escuchar', type: 'verb' },
      { sv: 'glad / lycklig',       es: 'feliz',     type: 'adj' },
      { sv: 'ledsen / trist',       es: 'triste',    type: 'adj' },
      { sv: 'trött',                es: 'cansado',   type: 'adj', note: 'cansada (f)' },
      { sv: 'sjuk',                 es: 'enfermo',   type: 'adj', note: 'enferma (f)' },
      { sv: 'trevlig / sympatisk',  es: 'simpático', type: 'adj', note: 'simpática (f)' },
      { sv: 'Hur?',               es: '¿Cómo?',    type: 'pron' },
      { sv: 'Var? / Vart?',      es: '¿Dónde?',   type: 'pron' },
      { sv: 'När?',               es: '¿Cuándo?',  type: 'pron' },
      { sv: 'Vad? / Vilket?',    es: '¿Qué?',     type: 'pron' },
      { sv: 'Vem?',               es: '¿Quién?',   type: 'pron' },
      { sv: 'Varför?',            es: '¿Por qué?', type: 'pron' },
      { sv: 'Hur mycket/många?', es: '¿Cuánto?',  type: 'pron', note: '¿Cuánta? (f)' },
      { sv: 'med (prep.)',        es: 'con',       type: 'prep' },
      { sv: 'utan (prep.)',       es: 'sin',       type: 'prep' },
      { sv: 'tillsammans',        es: 'juntos',    type: 'adj',  note: 'juntas (f)' },
    ],
  },

  // ══════════════════════════════════════════════════
  //  NYBÖRJARE  (kortlek 4–6)
  // ══════════════════════════════════════════════════

  {
    id: 4, level: 'Nybörjare', theme: 'Tid & kalender',
    words: [
      { sv: 'måndag',    es: 'lunes',      type: 'subst', gender: 'm' },
      { sv: 'tisdag',    es: 'martes',     type: 'subst', gender: 'm' },
      { sv: 'onsdag',    es: 'miércoles',  type: 'subst', gender: 'm' },
      { sv: 'torsdag',   es: 'jueves',     type: 'subst', gender: 'm' },
      { sv: 'fredag',    es: 'viernes',    type: 'subst', gender: 'm' },
      { sv: 'lördag',    es: 'sábado',     type: 'subst', gender: 'm' },
      { sv: 'söndag',    es: 'domingo',    type: 'subst', gender: 'm' },
      { sv: 'januari',   es: 'enero',      type: 'subst', gender: 'm' },
      { sv: 'februari',  es: 'febrero',    type: 'subst', gender: 'm' },
      { sv: 'mars',      es: 'marzo',      type: 'subst', gender: 'm' },
      { sv: 'april',     es: 'abril',      type: 'subst', gender: 'm' },
      { sv: 'maj',       es: 'mayo',       type: 'subst', gender: 'm' },
      { sv: 'juni',      es: 'junio',      type: 'subst', gender: 'm' },
      { sv: 'juli',      es: 'julio',      type: 'subst', gender: 'm' },
      { sv: 'augusti',   es: 'agosto',     type: 'subst', gender: 'm' },
      { sv: 'september', es: 'septiembre', type: 'subst', gender: 'm' },
      { sv: 'oktober',   es: 'octubre',    type: 'subst', gender: 'm' },
      { sv: 'november',  es: 'noviembre',  type: 'subst', gender: 'm' },
      { sv: 'december',  es: 'diciembre',  type: 'subst', gender: 'm' },
      { sv: 'sommar',         es: 'verano',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'vinter',         es: 'invierno',   article: 'el', type: 'subst', gender: 'm' },
      { sv: 'vår',            es: 'primavera',  article: 'la', type: 'subst', gender: 'f' },
      { sv: 'höst',           es: 'otoño',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'vecka',          es: 'semana',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'månad',          es: 'mes',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'timme / klocka', es: 'hora',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'minut',          es: 'minuto',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'klocka (ur)',    es: 'reloj',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'födelsedag',     es: 'cumpleaños', article: 'el', type: 'subst', gender: 'm', note: 'oförändrat i plural' },
      { sv: 'semester / lov', es: 'vacaciones', article: 'las',type: 'subst', gender: 'f', note: 'alltid plural' },
      { sv: 'fira',                es: 'celebrar', type: 'verb' },
      { sv: 'komma ihåg / minnas', es: 'recordar', type: 'verb', note: '(ue)' },
      { sv: 'glömma',              es: 'olvidar',  type: 'verb' },
      { sv: 'vila / koppla av',    es: 'descansar',type: 'verb' },
      { sv: 'ta lång tid / dröja', es: 'tardar',   type: 'verb' },
      { sv: 'gammal / antik',   es: 'antiguo',  type: 'adj', note: 'antigua (f)' },
      { sv: 'modern',           es: 'moderno',  type: 'adj', note: 'moderna (f)' },
      { sv: 'ledig / fri',     es: 'libre',    type: 'adj' },
      { sv: 'speciell',         es: 'especial', type: 'adj' },
      { sv: 'nästa / kommande', es: 'próximo',  type: 'adj', note: 'próxima (f)' },
      { sv: 'igår',           es: 'ayer',          type: 'adv' },
      { sv: 'igår kväll',     es: 'anoche',        type: 'adv' },
      { sv: 'ikväll',         es: 'esta noche',    type: 'uttr' },
      { sv: 'övermorgon',     es: 'pasado mañana', type: 'adv' },
      { sv: 'ibland',         es: 'a veces',       type: 'adv' },
      { sv: 'medan',          es: 'mientras',      type: 'konj' },
      { sv: 'redan / nu',     es: 'ya',            type: 'adv' },
      { sv: 'fortfarande',    es: 'todavía',       type: 'adv' },
      { sv: 'plötsligt',      es: 'de repente',    type: 'adv' },
      { sv: 'genast / strax', es: 'en seguida',    type: 'adv' },
    ],
  },

  {
    id: 5, level: 'Nybörjare', theme: 'Hem & möbler',
    words: [
      { sv: 'soffa',               es: 'sofá',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'säng',                es: 'cama',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'garderob / skåp',     es: 'armario',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'bokhylla',            es: 'estantería', article: 'la', type: 'subst', gender: 'f' },
      { sv: 'matta',               es: 'alfombra',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'lampa',               es: 'lámpara',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'spegel',              es: 'espejo',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'tavla / målning',     es: 'cuadro',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'dusch',               es: 'ducha',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'badkar',              es: 'bañera',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'kylskåp',             es: 'nevera',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'tvättmaskin',         es: 'lavadora',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'ugn',                 es: 'horno',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'mikrovågsugn',        es: 'microondas', article: 'el', type: 'subst', gender: 'm', note: 'oförändrat i plural' },
      { sv: 'television / teve',   es: 'televisión', article: 'la', type: 'subst', gender: 'f' },
      { sv: 'dator',               es: 'ordenador',  article: 'el', type: 'subst', gender: 'm' },
      { sv: 'hiss',                es: 'ascensor',   article: 'el', type: 'subst', gender: 'm' },
      { sv: 'trappa',              es: 'escalera',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'yttertak',            es: 'tejado',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'golv',                es: 'suelo',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'innertak',            es: 'techo',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'vägg',                es: 'pared',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'hall / korridor',     es: 'pasillo',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'vardagsrum',          es: 'salón',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'matsal',              es: 'comedor',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'garage',              es: 'garaje',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'källare',             es: 'sótano',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'balkong',             es: 'balcón',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'granne (m)',          es: 'vecino',     article: 'el', type: 'subst', gender: 'm', note: 'vecina (f)' },
      { sv: 'lägenhet',            es: 'piso',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'städa / rengöra',    es: 'limpiar',  type: 'verb' },
      { sv: 'städa / ordna',      es: 'ordenar',  type: 'verb' },
      { sv: 'flytta (reflexivt)', es: 'mudarse',  type: 'verb', note: 'reflexivt verb' },
      { sv: 'hyra',               es: 'alquilar', type: 'verb' },
      { sv: 'bygga / konstruera', es: 'construir',type: 'verb' },
      { sv: 'bekväm',         es: 'cómodo',   type: 'adj', note: 'cómoda (f)' },
      { sv: 'ren / städad',   es: 'limpio',   type: 'adj', note: 'limpia (f)' },
      { sv: 'smutsig',        es: 'sucio',    type: 'adj', note: 'sucia (f)' },
      { sv: 'mörk',           es: 'oscuro',   type: 'adj', note: 'oscura (f)' },
      { sv: 'ljus / ljusfylld',es: 'luminoso',type: 'adj', note: 'luminosa (f)' },
      { sv: 'uppåt / upp',      es: 'arriba',   type: 'adv' },
      { sv: 'nedåt / ner',      es: 'abajo',    type: 'adv' },
      { sv: 'inuti / inne',     es: 'dentro',   type: 'adv' },
      { sv: 'utanför / ute',    es: 'fuera',    type: 'adv' },
      { sv: 'ovanpå / ovanför', es: 'encima',   type: 'adv' },
      { sv: 'nedanför / under', es: 'debajo',   type: 'adv' },
      { sv: 'bredvid',          es: 'al lado',  type: 'uttr' },
      { sv: 'mitt emot',        es: 'enfrente', type: 'adv' },
      { sv: 'hemma',            es: 'en casa',  type: 'uttr' },
      { sv: 'sin egna (adj.)',  es: 'propio',   type: 'adj', note: 'propia (f)' },
    ],
  },

  {
    id: 6, level: 'Nybörjare', theme: 'Fritid & sport',
    words: [
      { sv: 'sport / idrott',      es: 'deporte',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'match',               es: 'partido',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'lag / team',          es: 'equipo',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'spelare (m)',         es: 'jugador',    article: 'el', type: 'subst', gender: 'm', note: 'jugadora (f)' },
      { sv: 'mästare (m)',         es: 'campeón',    article: 'el', type: 'subst', gender: 'm', note: 'campeona (f)' },
      { sv: 'plan / fält',         es: 'campo',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'stadion',             es: 'estadio',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'simbassäng',          es: 'piscina',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'gym / idrottshall',   es: 'gimnasio',   article: 'el', type: 'subst', gender: 'm' },
      { sv: 'cykel',               es: 'bicicleta',  article: 'la', type: 'subst', gender: 'f' },
      { sv: 'boll (liten)',        es: 'pelota',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'boll (stor)',         es: 'balón',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'film',                es: 'película',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'tv-serie',            es: 'serie',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'låt',                 es: 'canción',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'konsert',             es: 'concierto',  article: 'el', type: 'subst', gender: 'm' },
      { sv: 'teater',              es: 'teatro',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'museum',              es: 'museo',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'utställning',         es: 'exposición', article: 'la', type: 'subst', gender: 'f' },
      { sv: 'föreställning / show',es: 'espectáculo',article: 'el', type: 'subst', gender: 'm' },
      { sv: 'hobby / intresse',    es: 'afición',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'tv-spel / videospel', es: 'videojuego', article: 'el', type: 'subst', gender: 'm' },
      { sv: 'instrument',          es: 'instrumento',article: 'el', type: 'subst', gender: 'm' },
      { sv: 'gitarr',              es: 'guitarra',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'piano',               es: 'piano',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'målning / konst',     es: 'pintura',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'fotografi / foto',    es: 'fotografía', article: 'la', type: 'subst', gender: 'f' },
      { sv: 'resa',                es: 'viaje',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'nöje',                es: 'diversión',  article: 'la', type: 'subst', gender: 'f' },
      { sv: 'poäng',               es: 'punto',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'spela / leka',      es: 'jugar',    type: 'verb', note: '(ue)' },
      { sv: 'vinna / tjäna',     es: 'ganar',    type: 'verb' },
      { sv: 'förlora / tappa',   es: 'perder',   type: 'verb', note: '(ie)' },
      { sv: 'träna',             es: 'entrenar', type: 'verb' },
      { sv: 'utöva / träna på',  es: 'practicar',type: 'verb' },
      { sv: 'rolig / kul',       es: 'divertido',   type: 'adj', note: 'divertida (f)' },
      { sv: 'spännande',         es: 'emocionante', type: 'adj' },
      { sv: 'snabb',             es: 'rápido',      type: 'adj', note: 'rápida (f)' },
      { sv: 'långsam',           es: 'lento',       type: 'adj', note: 'lenta (f)' },
      { sv: 'favorit-',          es: 'favorito',    type: 'adj', note: 'favorita (f)' },
      { sv: 'Kom igen! / Vi åker!',  es: '¡Vamos!',        type: 'interj' },
      { sv: 'Kämpa på! / Håll ut!',  es: '¡Ánimo!',        type: 'interj' },
      { sv: 'äntligen',               es: 'por fin',        type: 'adv' },
      { sv: 'i lag / som ett lag',    es: 'en equipo',      type: 'uttr' },
      { sv: 'utomhus',                es: 'al aire libre',  type: 'uttr' },
      { sv: 'live / direkt',          es: 'en directo',     type: 'uttr' },
      { sv: 'dock / trots det',       es: 'sin embargo',    type: 'konj' },
      { sv: 'dessutom',               es: 'además',         type: 'adv' },
      { sv: 'även om / fast',         es: 'aunque',         type: 'konj' },
      { sv: 'Hur länge?',             es: '¿Cuánto tiempo?',type: 'pron' },
    ],
  },

  // ══════════════════════════════════════════════════
  //  MELLANNIVÅ  (kortlek 7–9)
  // ══════════════════════════════════════════════════

  {
    id: 7, level: 'Mellannivå', theme: 'Resor & transport',
    words: [
      { sv: 'biljett',                 es: 'billete',         article: 'el', type: 'subst', gender: 'm' },
      { sv: 'pass',                    es: 'pasaporte',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'resväska',                es: 'maleta',          article: 'la', type: 'subst', gender: 'f' },
      { sv: 'bagage',                  es: 'equipaje',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'tull',                    es: 'aduana',          article: 'la', type: 'subst', gender: 'f' },
      { sv: 'flygplats',               es: 'aeropuerto',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'flyg',                    es: 'vuelo',           article: 'el', type: 'subst', gender: 'm' },
      { sv: 'försening',               es: 'retraso',         article: 'el', type: 'subst', gender: 'm' },
      { sv: 'ankomst',                 es: 'llegada',         article: 'la', type: 'subst', gender: 'f' },
      { sv: 'avresa / utgång',         es: 'salida',          article: 'la', type: 'subst', gender: 'f' },
      { sv: 'hotell',                  es: 'hotel',           article: 'el', type: 'subst', gender: 'm' },
      { sv: 'vandrarhem',              es: 'albergue',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'reception',               es: 'recepción',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'dubbelrum',               es: 'habitación doble',article: 'la', type: 'subst', gender: 'f' },
      { sv: 'bokning / reservation',   es: 'reserva',         article: 'la', type: 'subst', gender: 'f' },
      { sv: 'karta',                   es: 'mapa',            article: 'el', type: 'subst', gender: 'm', note: 'el mapa (undantag — m)' },
      { sv: 'adress / riktning',       es: 'dirección',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'trafikljus',              es: 'semáforo',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'korsning',                es: 'cruce',           article: 'el', type: 'subst', gender: 'm' },
      { sv: 'motorväg',                es: 'autopista',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'landsväg',                es: 'carretera',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'hamn',                    es: 'puerto',          article: 'el', type: 'subst', gender: 'm' },
      { sv: 'båt / fartyg',            es: 'barco',           article: 'el', type: 'subst', gender: 'm' },
      { sv: 'taxi',                    es: 'taxi',            article: 'el', type: 'subst', gender: 'm' },
      { sv: 'tunnelbana',              es: 'metro',           article: 'el', type: 'subst', gender: 'm' },
      { sv: 'spårvagn',                es: 'tranvía',         article: 'el', type: 'subst', gender: 'm' },
      { sv: 'förare / chaufför (m)',   es: 'conductor',       article: 'el', type: 'subst', gender: 'm', note: 'conductora (f)' },
      { sv: 'destination',             es: 'destino',         article: 'el', type: 'subst', gender: 'm' },
      { sv: 'turist (m)',              es: 'turista',         article: 'el', type: 'subst', gender: 'm', note: 'la turista (f)' },
      { sv: 'tur-retur',               es: 'ida y vuelta',    type: 'uttr' },
      { sv: 'resa',                          es: 'viajar',  type: 'verb' },
      { sv: 'boka',                          es: 'reservar',type: 'verb' },
      { sv: 'gå vilse / tappa bort sig',     es: 'perderse',type: 'verb', note: 'reflexivt verb' },
      { sv: 'anlända / komma',               es: 'llegar',  type: 'verb' },
      { sv: 'avresa / ge sig av',            es: 'partir',  type: 'verb' },
      { sv: 'internationell',  es: 'internacional', type: 'adj' },
      { sv: 'direkt',          es: 'directo',       type: 'adj', note: 'directa (f)' },
      { sv: 'turistisk',       es: 'turístico',     type: 'adj', note: 'turística (f)' },
      { sv: 'nära / intilliggande', es: 'cercano',  type: 'adj', note: 'cercana (f)' },
      { sv: 'avlägsen / fjärran',   es: 'lejano',   type: 'adj', note: 'lejana (f)' },
      { sv: 'till höger',          es: 'a la derecha',    type: 'uttr' },
      { sv: 'till vänster',        es: 'a la izquierda',  type: 'uttr' },
      { sv: 'rakt fram',           es: 'todo recto',      type: 'uttr' },
      { sv: 'utan mellanlandning', es: 'sin escala',      type: 'uttr' },
      { sv: 'i tid',               es: 'a tiempo',        type: 'uttr' },
      { sv: 'försenad',            es: 'con retraso',     type: 'uttr' },
      { sv: 'enkel (biljett)',     es: 'de ida',          type: 'uttr' },
      { sv: 'utomlands',           es: 'en el extranjero',type: 'uttr' },
      { sv: 'å ena sidan',         es: 'por un lado',     type: 'uttr' },
      { sv: 'å andra sidan',       es: 'por otro lado',   type: 'uttr' },
    ],
  },

  {
    id: 8, level: 'Mellannivå', theme: 'Hälsa & kropp',
    words: [
      { sv: 'läkare (m)',            es: 'médico',       article: 'el', type: 'subst', gender: 'm', note: 'médica (f)' },
      { sv: 'sjuksköterska (m)',     es: 'enfermero',    article: 'el', type: 'subst', gender: 'm', note: 'enfermera (f)' },
      { sv: 'apotek',                es: 'farmacia',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'medicin / läkemedel',   es: 'medicamento',  article: 'el', type: 'subst', gender: 'm' },
      { sv: 'piller / tablett',      es: 'pastilla',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'recept',                es: 'receta',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'smärta / värk',         es: 'dolor',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'feber',                 es: 'fiebre',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'förkylning',            es: 'resfriado',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'influensa',             es: 'gripe',        article: 'la', type: 'subst', gender: 'f' },
      { sv: 'allergi',               es: 'alergia',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'sår / skada',           es: 'herida',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'benbrott / fraktur',    es: 'fractura',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'operation',             es: 'operación',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'akuten',                es: 'urgencias',    article: 'las',type: 'subst', gender: 'f', note: 'alltid plural' },
      { sv: 'ambulans',              es: 'ambulancia',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'blod',                  es: 'sangre',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'ben (skelett)',         es: 'hueso',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'muskel',                es: 'músculo',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'lunga',                 es: 'pulmón',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'mage',                  es: 'estómago',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'rygg',                  es: 'espalda',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'hals (svalg)',          es: 'garganta',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'knä',                   es: 'rodilla',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'fotled',                es: 'tobillo',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'handled',               es: 'muñeca',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'armbåge',               es: 'codo',         article: 'el', type: 'subst', gender: 'm' },
      { sv: 'axel (kroppsdel)',      es: 'hombro',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'bröstkorg',             es: 'pecho',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'hälsa',                 es: 'salud',        article: 'la', type: 'subst', gender: 'f' },
      { sv: 'göra ont (oregelb.)',   es: 'doler',       type: 'verb', note: '(ue) — me duele / me duelen' },
      { sv: 'bota / läka',           es: 'curar',       type: 'verb' },
      { sv: 'skriva ut (recept)',    es: 'recetar',     type: 'verb' },
      { sv: 'vaccinera',             es: 'vacunar',     type: 'verb' },
      { sv: 'återhämta sig',         es: 'recuperarse', type: 'verb', note: 'reflexivt verb' },
      { sv: 'frisk / hälsosam',     es: 'sano',       type: 'adj', note: 'sana (f)' },
      { sv: 'skadad',               es: 'herido',     type: 'adj', note: 'herida (f)' },
      { sv: 'allvarlig / svår',     es: 'grave',      type: 'adj' },
      { sv: 'kronisk',              es: 'crónico',    type: 'adj', note: 'crónica (f)' },
      { sv: 'allergisk',            es: 'alérgico',   type: 'adj', note: 'alérgica (f)' },
      { sv: 'det gör ont (i mig)',  es: 'me duele',            type: 'uttr' },
      { sv: 'ha feber',             es: 'tener fiebre',         type: 'uttr' },
      { sv: 'vara förkyld',         es: 'estar resfriado',      type: 'uttr' },
      { sv: 'boka tid',             es: 'pedir cita',           type: 'uttr' },
      { sv: 'ta medicin',           es: 'tomar medicación',     type: 'uttr' },
      { sv: 'vara i form',          es: 'estar en forma',       type: 'uttr' },
      { sv: 'leva hälsosamt',       es: 'llevar una vida sana', type: 'uttr' },
      { sv: 'skada sig',            es: 'hacerse daño',         type: 'uttr' },
      { sv: 'lyckligtvis / tur nog',es: 'por suerte',           type: 'adv' },
      { sv: 'tyvärr',               es: 'por desgracia',        type: 'adv' },
    ],
  },

  {
    id: 9, level: 'Mellannivå', theme: 'Arbete & utbildning',
    words: [
      { sv: 'företag',                es: 'empresa',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'kontor',                 es: 'oficina',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'chef / boss (m)',        es: 'jefe',        article: 'el', type: 'subst', gender: 'm', note: 'jefa (f)' },
      { sv: 'anställd (m)',           es: 'empleado',    article: 'el', type: 'subst', gender: 'm', note: 'empleada (f)' },
      { sv: 'lön',                    es: 'sueldo',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'kontrakt / avtal',       es: 'contrato',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'möte',                   es: 'reunión',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'intervju / jobbintervju',es: 'entrevista',  article: 'la', type: 'subst', gender: 'f' },
      { sv: 'CV / meritförteckning',  es: 'currículum',  article: 'el', type: 'subst', gender: 'm' },
      { sv: 'yrke / profession',      es: 'profesión',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'affär / handel',         es: 'negocio',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'kund / klient (m)',      es: 'cliente',     article: 'el', type: 'subst', gender: 'm', note: 'clienta (f)' },
      { sv: 'produkt',                es: 'producto',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'tjänst / service',       es: 'servicio',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'skatt',                  es: 'impuesto',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'faktura / kvitto',       es: 'factura',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'titel / examensbevis',   es: 'título',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'skolämne',               es: 'asignatura',  article: 'la', type: 'subst', gender: 'f' },
      { sv: 'betyg / poäng',          es: 'nota',        article: 'la', type: 'subst', gender: 'f' },
      { sv: 'prov / examen',          es: 'examen',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'anteckningar',           es: 'apuntes',     article: 'los',type: 'subst', gender: 'm', note: 'alltid plural' },
      { sv: 'stipendium',             es: 'beca',        article: 'la', type: 'subst', gender: 'f' },
      { sv: 'språk',                  es: 'idioma',      article: 'el', type: 'subst', gender: 'm', note: 'el idioma (undantag — m)' },
      { sv: 'ordförråd / vokabulär',  es: 'vocabulario', article: 'el', type: 'subst', gender: 'm' },
      { sv: 'grammatik',              es: 'gramática',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'ordbok',                 es: 'diccionario', article: 'el', type: 'subst', gender: 'm' },
      { sv: 'bibliotek',              es: 'biblioteca',  article: 'la', type: 'subst', gender: 'f' },
      { sv: 'laboratorium',           es: 'laboratorio', article: 'el', type: 'subst', gender: 'm' },
      { sv: 'rektor (m)',             es: 'director',    article: 'el', type: 'subst', gender: 'm', note: 'directora (f)' },
      { sv: 'strejk',                 es: 'huelga',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'ansöka / söka',        es: 'solicitar',  type: 'verb' },
      { sv: 'anställa / anlita',    es: 'contratar',  type: 'verb' },
      { sv: 'avskeda / säga upp',   es: 'despedir',   type: 'verb', note: '(i)' },
      { sv: 'klara / godkänna',     es: 'aprobar',    type: 'verb', note: '(ue)' },
      { sv: 'bli underkänd',        es: 'suspender',  type: 'verb' },
      { sv: 'svår / besvärlig',  es: 'difícil',   type: 'adj' },
      { sv: 'lätt / enkel',      es: 'fácil',     type: 'adj' },
      { sv: 'nödvändig',         es: 'necesario', type: 'adj', note: 'necesaria (f)' },
      { sv: 'möjlig',            es: 'posible',   type: 'adj' },
      { sv: 'omöjlig',           es: 'imposible', type: 'adj' },
      { sv: 'heltid',                    es: 'a tiempo completo', type: 'uttr' },
      { sv: 'deltid',                    es: 'a tiempo parcial',  type: 'uttr' },
      { sv: 'vara sjukskriven',          es: 'estar de baja',     type: 'uttr' },
      { sv: 'följaktligen / alltså',     es: 'por lo tanto',      type: 'konj' },
      { sv: 'å andra sidan / däremot',   es: 'en cambio',         type: 'uttr' },
      { sv: 'det vill säga / dvs',       es: 'es decir',          type: 'uttr' },
      { sv: 'till exempel / t.ex.',      es: 'por ejemplo',       type: 'uttr' },
      { sv: 'från och med',              es: 'a partir de',       type: 'prep' },
      { sv: 'ta hänsyn till',            es: 'tener en cuenta',   type: 'uttr' },
      { sv: 'när det gäller',            es: 'en cuanto a',       type: 'uttr' },
    ],
  },

  // ══════════════════════════════════════════════════
  //  MELLANSVÅR  (kortlek 10–12)
  // ══════════════════════════════════════════════════

  {
    id: 10, level: 'Mellansvår', theme: 'Känslor & relationer',
    words: [
      { sv: 'känsla',                es: 'sentimiento', article: 'el', type: 'subst', gender: 'm' },
      { sv: 'känsla / emotion',      es: 'emoción',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'kärlek',                es: 'amor',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'hat',                   es: 'odio',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'rädsla / fruktan',      es: 'miedo',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'skam / genans',         es: 'vergüenza',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'stolthet',              es: 'orgullo',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'svartsjuka',            es: 'celos',       article: 'los',type: 'subst', gender: 'm', note: 'alltid plural' },
      { sv: 'förtroende / tillit',   es: 'confianza',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'vänskap',               es: 'amistad',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'partner / par',         es: 'pareja',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'pojkvän / fästman (m)', es: 'novio',       article: 'el', type: 'subst', gender: 'm', note: 'novia (f)' },
      { sv: 'äktenskap',             es: 'matrimonio',  article: 'el', type: 'subst', gender: 'm' },
      { sv: 'skilsmässa',            es: 'divorcio',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'bröllop',               es: 'boda',        article: 'la', type: 'subst', gender: 'f' },
      { sv: 'födelse',               es: 'nacimiento',  article: 'el', type: 'subst', gender: 'm' },
      { sv: 'död',                   es: 'muerte',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'ensamhet',              es: 'soledad',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'medkänsla',             es: 'compasión',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'empati',                es: 'empatía',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'ilska / vrede',         es: 'ira',         article: 'la', type: 'subst', gender: 'f' },
      { sv: 'glädje',                es: 'alegría',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'sorg / ledsenhet',      es: 'tristeza',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'hopp',                  es: 'esperanza',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'oro / bekymmer',        es: 'preocupación',article: 'la', type: 'subst', gender: 'f' },
      { sv: 'stress',                es: 'estrés',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'trauma',                es: 'trauma',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'stöd',                  es: 'apoyo',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'kram / famntag',        es: 'abrazo',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'förlåtelse',            es: 'perdón',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'bli kär / förälska sig', es: 'enamorarse', type: 'verb', note: 'reflexivt verb' },
      { sv: 'hata',                   es: 'odiar',      type: 'verb' },
      { sv: 'stötta / stödja',        es: 'apoyar',     type: 'verb' },
      { sv: 'lita på / ha förtroende',es: 'confiar',    type: 'verb' },
      { sv: 'övervinna / komma över', es: 'superar',    type: 'verb' },
      { sv: 'rörd / upprymd',        es: 'emocionado',  type: 'adj', note: 'emocionada (f)' },
      { sv: 'stolt',                 es: 'orgulloso',   type: 'adj', note: 'orgullosa (f)' },
      { sv: 'svartsjuk',             es: 'celoso',      type: 'adj', note: 'celosa (f)' },
      { sv: 'skamsen / generad',     es: 'avergonzado', type: 'adj', note: 'avergonzada (f)' },
      { sv: 'tacksam',               es: 'agradecido',  type: 'adj', note: 'agradecida (f)' },
      { sv: 'ha lust att / längta efter', es: 'tener ganas de', type: 'uttr' },
      { sv: 'vara trött på / ha nog av',  es: 'estar harto de', type: 'uttr' },
      { sv: 'komma överens',              es: 'llevarse bien',   type: 'uttr' },
      { sv: 'inte komma överens',         es: 'llevarse mal',    type: 'uttr' },
      { sv: 'sakna',                      es: 'echar de menos',  type: 'uttr' },
      { sv: 'skrämma / göra rädd',       es: 'dar miedo',       type: 'uttr' },
      { sv: 'göra generad',               es: 'dar vergüenza',   type: 'uttr' },
      { sv: 'äckla',                      es: 'dar asco',        type: 'uttr' },
      { sv: 'göra nervös',                es: 'poner nervioso',  type: 'uttr' },
      { sv: 'trots',                      es: 'a pesar de',      type: 'prep' },
    ],
  },

  {
    id: 11, level: 'Mellansvår', theme: 'Natur & miljö',
    words: [
      { sv: 'skog',               es: 'bosque',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'djungel / regnskog', es: 'selva',         article: 'la', type: 'subst', gender: 'f' },
      { sv: 'öken',               es: 'desierto',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'sjö',                es: 'lago',          article: 'el', type: 'subst', gender: 'm' },
      { sv: 'ocean',              es: 'océano',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'vattenfall',         es: 'cascada',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'vulkan',             es: 'volcán',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'jordbävning',        es: 'terremoto',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'storm / oväder',     es: 'tormenta',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'åska (brus)',        es: 'trueno',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'blixt',              es: 'rayo',          article: 'el', type: 'subst', gender: 'm' },
      { sv: 'dimma',              es: 'niebla',        article: 'la', type: 'subst', gender: 'f' },
      { sv: 'snö',                es: 'nieve',         article: 'la', type: 'subst', gender: 'f' },
      { sv: 'regn',               es: 'lluvia',        article: 'la', type: 'subst', gender: 'f' },
      { sv: 'sand',               es: 'arena',         article: 'la', type: 'subst', gender: 'f' },
      { sv: 'jord / mark',        es: 'tierra',        article: 'la', type: 'subst', gender: 'f' },
      { sv: 'luft',               es: 'aire',          article: 'el', type: 'subst', gender: 'm' },
      { sv: 'eld / brand',        es: 'fuego',         article: 'el', type: 'subst', gender: 'm' },
      { sv: 'is',                 es: 'hielo',         article: 'el', type: 'subst', gender: 'm' },
      { sv: 'våg (hav)',          es: 'ola',           article: 'la', type: 'subst', gender: 'f' },
      { sv: 'klimat',             es: 'clima',         article: 'el', type: 'subst', gender: 'm' },
      { sv: 'temperatur',         es: 'temperatura',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'miljö',              es: 'medioambiente', article: 'el', type: 'subst', gender: 'm' },
      { sv: 'förorening',         es: 'contaminación', article: 'la', type: 'subst', gender: 'f' },
      { sv: 'återvinning',        es: 'reciclaje',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'energi',             es: 'energía',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'resurs',             es: 'recurso',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'art (biologisk)',    es: 'especie',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'växthusgaser',       es: 'gases de efecto invernadero', type: 'subst', gender: 'm', note: 'alltid plural' },
      { sv: 'naturkatastrof',     es: 'catástrofe natural', article: 'la', type: 'subst', gender: 'f' },
      { sv: 'förorena',    es: 'contaminar', type: 'verb' },
      { sv: 'återvinna',   es: 'reciclar',   type: 'verb' },
      { sv: 'skydda',      es: 'proteger',   type: 'verb' },
      { sv: 'förstöra',    es: 'destruir',   type: 'verb' },
      { sv: 'överleva',    es: 'sobrevivir', type: 'verb' },
      { sv: 'vild',     es: 'salvaje',    type: 'adj' },
      { sv: 'hållbar',  es: 'sostenible', type: 'adj' },
      { sv: 'förnybar', es: 'renovable',  type: 'adj' },
      { sv: 'giftig',   es: 'tóxico',     type: 'adj', note: 'tóxica (f)' },
      { sv: 'utdöd',    es: 'extinto',    type: 'adj', note: 'extinta (f)' },
      { sv: 'utrotningshotad',          es: 'en peligro de extinción',       type: 'uttr' },
      { sv: 'klimatförändring',         es: 'cambio climático',               type: 'uttr' },
      { sv: 'global uppvärmning',       es: 'calentamiento global',           type: 'uttr' },
      { sv: 'solenergi',                es: 'energía solar',                  type: 'uttr' },
      { sv: 'vindenergi',               es: 'energía eólica',                 type: 'uttr' },
      { sv: 'koldioxidavtryck',         es: 'huella de carbono',              type: 'uttr' },
      { sv: 'på grund av',              es: 'a causa de',                     type: 'prep' },
      { sv: 'till följd av',            es: 'debido a',                       type: 'prep' },
      { sv: 'emellertid / trots detta', es: 'no obstante',                    type: 'konj' },
      { sv: 'å ena sidan … å andra',   es: 'por un lado … por otro',         type: 'uttr' },
    ],
  },

  {
    id: 12, level: 'Mellansvår', theme: 'Kultur & media',
    words: [
      { sv: 'socialt medium',          es: 'red social',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'app / applikation',       es: 'aplicación',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'skärm',                   es: 'pantalla',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'tangentbord',             es: 'teclado',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'mus (dator)',             es: 'ratón',         article: 'el', type: 'subst', gender: 'm' },
      { sv: 'fil / arkiv',             es: 'archivo',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'lösenord',                es: 'contraseña',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'nedladdning',             es: 'descarga',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'algoritm',                es: 'algoritmo',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'nyhet',                   es: 'noticia',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'tidning',                 es: 'periódico',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'tidskrift / magasin',     es: 'revista',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'förlag',                  es: 'editorial',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'författare (m)',          es: 'escritor',      article: 'el', type: 'subst', gender: 'm', note: 'escritora (f)' },
      { sv: 'konstnär / målare (m)',   es: 'pintor',        article: 'el', type: 'subst', gender: 'm', note: 'pintora (f)' },
      { sv: 'skulptör (m)',            es: 'escultor',      article: 'el', type: 'subst', gender: 'm', note: 'escultora (f)' },
      { sv: 'mästerverk',              es: 'obra maestra',  article: 'la', type: 'subst', gender: 'f' },
      { sv: 'kulturarv',               es: 'patrimonio',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'tradition',               es: 'tradición',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'sedvänja / vana',         es: 'costumbre',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'folklore',                es: 'folclore',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'litteratur',              es: 'literatura',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'poesi',                   es: 'poesía',        article: 'la', type: 'subst', gender: 'f' },
      { sv: 'roman',                   es: 'novela',        article: 'la', type: 'subst', gender: 'f' },
      { sv: 'saga / berättelse',       es: 'cuento',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'språk / tunga',           es: 'lengua',        article: 'la', type: 'subst', gender: 'f' },
      { sv: 'dialekt',                 es: 'dialecto',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'undertext',               es: 'subtítulo',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'artificiell intelligens', es: 'inteligencia artificial', article: 'la', type: 'subst', gender: 'f' },
      { sv: 'influencer',              es: 'influencer',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'publicera',    es: 'publicar',  type: 'verb' },
      { sv: 'dela (med sig)',es: 'compartir',type: 'verb' },
      { sv: 'designa / rita',es: 'diseñar',  type: 'verb' },
      { sv: 'redigera',     es: 'editar',    type: 'verb' },
      { sv: 'sprida / sända',es: 'difundir', type: 'verb' },
      { sv: 'viral',    es: 'viral',     type: 'adj' },
      { sv: 'digital',  es: 'digital',   type: 'adj' },
      { sv: 'analog',   es: 'analógico', type: 'adj', note: 'analógica (f)' },
      { sv: 'global',   es: 'global',    type: 'adj' },
      { sv: 'lokal',    es: 'local',     type: 'adj' },
      { sv: 'online',                        es: 'en línea',             type: 'uttr' },
      { sv: 'i realtid',                     es: 'a tiempo real',        type: 'uttr' },
      { sv: 'sociala medier',                es: 'redes sociales',       type: 'uttr' },
      { sv: 'nuförtiden / idag',             es: 'hoy en día',           type: 'uttr' },
      { sv: 'nyligen',                       es: 'hace poco',            type: 'adv' },
      { sv: 'till viss del',                 es: 'hasta cierto punto',   type: 'uttr' },
      { sv: 'det bör påpekas',               es: 'cabe destacar',        type: 'uttr' },
      { sv: 'med andra ord',                 es: 'en otras palabras',    type: 'uttr' },
      { sv: 'vad beträffar',                 es: 'en lo que respecta a', type: 'uttr' },
      { sv: 'i jämförelse med',              es: 'en comparación con',   type: 'uttr' },
    ],
  },

  // ══════════════════════════════════════════════════
  //  SVÅR  (kortlek 13–14)
  // ══════════════════════════════════════════════════

  {
    id: 13, level: 'Svår', theme: 'Politik & samhälle',
    words: [
      { sv: 'regering',                    es: 'gobierno',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'parlament',                   es: 'parlamento',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'demokrati',                   es: 'democracia',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'diktatur',                    es: 'dictadura',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'val (politiskt)',              es: 'elección',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'röst / omröstning',           es: 'voto',          article: 'el', type: 'subst', gender: 'm' },
      { sv: 'kandidat (m)',                 es: 'candidato',     article: 'el', type: 'subst', gender: 'm', note: 'candidata (f)' },
      { sv: 'president (m)',                es: 'presidente',    article: 'el', type: 'subst', gender: 'm', note: 'presidenta (f)' },
      { sv: 'minister (m)',                 es: 'ministro',      article: 'el', type: 'subst', gender: 'm', note: 'ministra (f)' },
      { sv: 'medborgare (m)',               es: 'ciudadano',     article: 'el', type: 'subst', gender: 'm', note: 'ciudadana (f)' },
      { sv: 'rättighet / rätt',            es: 'derecho',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'skyldighet / plikt',          es: 'deber',         article: 'el', type: 'subst', gender: 'm' },
      { sv: 'lag',                         es: 'ley',           article: 'la', type: 'subst', gender: 'f' },
      { sv: 'rättvisa / rättsväsende',     es: 'justicia',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'domstol',                     es: 'tribunal',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'rättegång',                   es: 'juicio',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'brott (enstaka)',              es: 'delito',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'kriminalitet',                es: 'crimen',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'polis (kår)',                  es: 'policía',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'armé / militär',               es: 'ejército',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'gräns',                       es: 'frontera',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'invandring',                  es: 'inmigración',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'emigration / utflyttning',    es: 'emigración',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'flykting (m)',                 es: 'refugiado',     article: 'el', type: 'subst', gender: 'm', note: 'refugiada (f)' },
      { sv: 'fattigdom',                   es: 'pobreza',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'ojämlikhet',                  es: 'desigualdad',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'korruption',                  es: 'corrupción',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'demonstration',               es: 'manifestación', article: 'la', type: 'subst', gender: 'f' },
      { sv: 'fackförbund',                 es: 'sindicato',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'konstitution / grundlag',     es: 'constitución',  article: 'la', type: 'subst', gender: 'f' },
      { sv: 'rösta',          es: 'votar',     type: 'verb' },
      { sv: 'protestera',     es: 'protestar', type: 'verb' },
      { sv: 'regera / styra', es: 'gobernar',  type: 'verb', note: '(ie)' },
      { sv: 'förhandla',      es: 'negociar',  type: 'verb' },
      { sv: 'lagstifta',      es: 'legislar',  type: 'verb' },
      { sv: 'demokratisk',  es: 'democrático', type: 'adj', note: 'democrática (f)' },
      { sv: 'korrupt',      es: 'corrupto',    type: 'adj', note: 'corrupta (f)' },
      { sv: 'suverän',      es: 'soberano',    type: 'adj', note: 'soberana (f)' },
      { sv: 'konservativ',  es: 'conservador', type: 'adj', note: 'conservadora (f)' },
      { sv: 'progressiv',   es: 'progresista', type: 'adj' },
      { sv: 'ha rätt till',         es: 'tener derecho a',    type: 'uttr' },
      { sv: 'uppfylla / fullgöra',  es: 'cumplir con',        type: 'uttr' },
      { sv: 'vid makten',           es: 'en el poder',        type: 'uttr' },
      { sv: 'komma till makten',    es: 'llegar al poder',    type: 'uttr' },
      { sv: 'vidta åtgärder',       es: 'tomar medidas',      type: 'uttr' },
      { sv: 'på nationell nivå',    es: 'a nivel nacional',   type: 'uttr' },
      { sv: 'enhälligt',            es: 'por unanimidad',     type: 'adv' },
      { sv: 'med avseende på',      es: 'con respecto a',     type: 'prep' },
      { sv: 'i kraft av',           es: 'en virtud de',       type: 'prep' },
      { sv: 'i linje med',          es: 'en consonancia con', type: 'uttr' },
    ],
  },

  {
    id: 14, level: 'Svår', theme: 'Abstrakt tänkande',
    words: [
      { sv: 'begrepp / koncept',     es: 'concepto',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'idé',                   es: 'idea',          article: 'la', type: 'subst', gender: 'f' },
      { sv: 'teori',                 es: 'teoría',        article: 'la', type: 'subst', gender: 'f' },
      { sv: 'hypotes',               es: 'hipótesis',     article: 'la', type: 'subst', gender: 'f', note: 'oförändrat i pl' },
      { sv: 'argument',              es: 'argumento',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'debatt',                es: 'debate',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'dilemma',               es: 'dilema',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'paradox',               es: 'paradoja',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'motsägelse',            es: 'contradicción', article: 'la', type: 'subst', gender: 'f' },
      { sv: 'konsekvens / följd',    es: 'consecuencia',  article: 'la', type: 'subst', gender: 'f' },
      { sv: 'orsak',                 es: 'causa',         article: 'la', type: 'subst', gender: 'f' },
      { sv: 'effekt',                es: 'efecto',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'process',               es: 'proceso',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'resultat',              es: 'resultado',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'syfte / avsikt',        es: 'propósito',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'mål / syfte',           es: 'objetivo',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'perspektiv',            es: 'perspectiva',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'synpunkt / ståndpunkt', es: 'punto de vista',article: 'el', type: 'subst', gender: 'm' },
      { sv: 'åsikt',                 es: 'opinión',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'övertygelse / tro',     es: 'creencia',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'värde / värdering',     es: 'valor',         article: 'el', type: 'subst', gender: 'm' },
      { sv: 'princip',               es: 'principio',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'etik',                  es: 'ética',         article: 'la', type: 'subst', gender: 'f' },
      { sv: 'moral',                 es: 'moral',         article: 'la', type: 'subst', gender: 'f' },
      { sv: 'filosofi',              es: 'filosofía',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'logik',                 es: 'lógica',        article: 'la', type: 'subst', gender: 'f' },
      { sv: 'skäl / förnuft',        es: 'razón',         article: 'la', type: 'subst', gender: 'f' },
      { sv: 'samvete / medvetande',  es: 'conciencia',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'identitet',             es: 'identidad',     article: 'la', type: 'subst', gender: 'f' },
      { sv: 'existens / tillvaro',   es: 'existencia',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'reflektera / fundera',     es: 'reflexionar', type: 'verb' },
      { sv: 'ifrågasätta',              es: 'cuestionar',  type: 'verb' },
      { sv: 'argumentera',              es: 'argumentar',  type: 'verb' },
      { sv: 'visa / bevisa',            es: 'demostrar',   type: 'verb', note: '(ue)' },
      { sv: 'dra slutsatser / avsluta', es: 'concluir',    type: 'verb' },
      { sv: 'abstrakt',          es: 'abstracto',   type: 'adj', note: 'abstracta (f)' },
      { sv: 'konkret',           es: 'concreto',    type: 'adj', note: 'concreta (f)' },
      { sv: 'tvetydig / oklar',  es: 'ambiguo',     type: 'adj', note: 'ambigua (f)' },
      { sv: 'djup / djupsinnig', es: 'profundo',    type: 'adj', note: 'profunda (f)' },
      { sv: 'ytlig',             es: 'superficial', type: 'adj' },
      { sv: 'i termer av',                    es: 'en términos de',          type: 'uttr' },
      { sv: 'från min synpunkt',              es: 'desde mi punto de vista', type: 'uttr' },
      { sv: 'man kan fråga sig',              es: 'cabe preguntarse',        type: 'uttr' },
      { sv: 'i stora drag',                   es: 'a grandes rasgos',        type: 'uttr' },
      { sv: 'sammanfattningsvis',             es: 'en definitiva',           type: 'uttr' },
      { sv: 'med andra ord',                  es: 'dicho de otro modo',      type: 'uttr' },
      { sv: 'i den mån',                      es: 'en la medida en que',     type: 'uttr' },
      { sv: 'visserligen / om än',            es: 'si bien',                 type: 'konj' },
      { sv: 'trots / oaktat (formellt)',      es: 'pese a',                  type: 'prep' },
      { sv: 'förutsatt att',                  es: 'siempre que',             type: 'konj' },
    ],
  },

  // ══════════════════════════════════════════════════
  //  PROFFS  (kortlek 15)
  // ══════════════════════════════════════════════════

  {
    id: 15, level: 'Proffs', theme: 'Akademisk & avancerad',
    words: [
      { sv: 'verktyg',                    es: 'herramienta', article: 'la', type: 'subst', gender: 'f' },
      { sv: 'område / sfär',              es: 'ámbito',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'räckvidd / genomslag',       es: 'alcance',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'påverkan / effekt',          es: 'impacto',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'utmaning',                   es: 'reto',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'hinder',                     es: 'obstáculo',   article: 'el', type: 'subst', gender: 'm' },
      { sv: 'alternativ',                 es: 'alternativa', article: 'la', type: 'subst', gender: 'f' },
      { sv: 'prioritet',                  es: 'prioridad',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'kriterium',                  es: 'criterio',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'parameter',                  es: 'parámetro',   article: 'el', type: 'subst', gender: 'm' },
      { sv: 'nyans',                      es: 'matiz',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'nyckel / avgörande faktor',  es: 'clave',       article: 'la', type: 'subst', gender: 'f' },
      { sv: 'omgivning / kontext',        es: 'entorno',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'sammanhang / kontext',       es: 'contexto',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'ram / ramverk',              es: 'marco',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'referens / hänvisning',      es: 'referencia',  article: 'la', type: 'subst', gender: 'f' },
      { sv: 'ansats / fokus',             es: 'enfoque',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'förslag',                    es: 'propuesta',   article: 'la', type: 'subst', gender: 'f' },
      { sv: 'lösning',                    es: 'solución',    article: 'la', type: 'subst', gender: 'f' },
      { sv: 'ytterligare utmaning',       es: 'desafío',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'framsteg',                   es: 'avance',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'tillbakagång / bakslag',     es: 'retroceso',   article: 'el', type: 'subst', gender: 'm' },
      { sv: 'klyfta / gap',               es: 'brecha',      article: 'la', type: 'subst', gender: 'f' },
      { sv: 'tröskel',                    es: 'umbral',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'ansträngning / insats',      es: 'esfuerzo',    article: 'el', type: 'subst', gender: 'm' },
      { sv: 'prestation / framgång',      es: 'logro',       article: 'el', type: 'subst', gender: 'm' },
      { sv: 'misslyckande',               es: 'fracaso',     article: 'el', type: 'subst', gender: 'm' },
      { sv: 'arv / legacy',               es: 'legado',      article: 'el', type: 'subst', gender: 'm' },
      { sv: 'milstolpe',                  es: 'hito',        article: 'el', type: 'subst', gender: 'm' },
      { sv: 'karriärväg / bana',          es: 'trayectoria', article: 'la', type: 'subst', gender: 'f' },
      { sv: 'implementera',             es: 'implementar', type: 'verb' },
      { sv: 'anta / ta på sig',         es: 'asumir',      type: 'verb' },
      { sv: 'ta itu med / ta sig an',   es: 'abordar',     type: 'verb' },
      { sv: 'ställa / lyfta fram',      es: 'plantear',    type: 'verb' },
      { sv: 'påverka / ha inverkan på', es: 'incidir',     type: 'verb' },
      { sv: 'uttömmande / grundlig',      es: 'exhaustivo',    type: 'adj', note: 'exhaustiva (f)' },
      { sv: 'inneboende',                 es: 'inherente',     type: 'adj' },
      { sv: 'begynnande / framväxande',   es: 'incipiente',    type: 'adj' },
      { sv: 'kontroversiell',             es: 'controvertido', type: 'adj', note: 'controvertida (f)' },
      { sv: 'paradigmatisk',              es: 'paradigmático', type: 'adj', note: 'paradigmática (f)' },
      { sv: 'det råder inget tvivel om att', es: 'no cabe duda de que',  type: 'uttr' },
      { sv: 'det är värt (besväret)',        es: 'vale la pena',         type: 'uttr' },
      { sv: 'inse / komma på',               es: 'caer en la cuenta',    type: 'uttr' },
      { sv: 'ta för givet',                  es: 'dar por sentado',      type: 'uttr' },
      { sv: 'lyfta fram / avslöja',          es: 'sacar a la luz',       type: 'uttr' },
      { sv: 'genomföra / utföra',            es: 'llevar a cabo',        type: 'uttr' },
      { sv: 'sätta igång / starta upp',      es: 'poner en marcha',      type: 'uttr' },
      { sv: 'möta / ta itu med',             es: 'hacer frente a',       type: 'uttr' },
      { sv: 'påvisa / uppdaga',              es: 'poner de manifiesto',  type: 'uttr' },
      { sv: 'ha i åtanke',                   es: 'tener presente',       type: 'uttr' },
    ],
  },

];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(s) {
  return s
    .toLowerCase().trim()
    .replace(/[¿¡?!.,;:]/g, '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ').trim();
}

function displayAnswer(word) {
  if (word.article) return `${word.article} ${word.es}`;
  return word.es;
}

function checkAnswer(input, word) {
  const u    = normalize(input);
  const es   = normalize(word.es);
  const full = word.article ? normalize(`${word.article} ${word.es}`) : null;
  return u === es || (full !== null && u === full);
}

function generateChoices(deckWords, correct) {
  const pool  = shuffle(deckWords.filter(w => w.es !== correct.es));
  const wrong = pool.slice(0, 3);
  return shuffle([correct, ...wrong]);
}

function typeDisplay(word) {
  const base = TYPE_LABEL[word.type] || word.type;
  if (word.type === 'subst' && word.article) return `${base} · ${word.article}`;
  return base;
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function DeckCard({ deck, onStart }) {
  const counts = deck.words.reduce((acc, w) => {
    acc[w.type] = (acc[w.type] || 0) + 1;
    return acc;
  }, {});
  const other = deck.words.length - (counts.subst || 0) - (counts.verb || 0) - (counts.adj || 0);
  return (
    <div className={styles.deckCard}>
      <div className={styles.deckTop}>
        <span className={styles.deckNum}>{deck.id}</span>
        <span className={styles.deckLevel}>{deck.level}</span>
      </div>
      <p className={styles.deckTheme}>{deck.theme}</p>
      <p className={styles.deckCount}>{deck.words.length} glosor</p>
      <p className={styles.deckCompo}>
        {counts.subst || 0} subst · {counts.verb || 0} verb · {counts.adj || 0} adj · {other} blandat
      </p>
      <button className={styles.deckStartBtn} onClick={onStart}>Börja öva →</button>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function Glosdrilla() {
  const [phase,    setPhase]    = useState('select');
  const [deckId,   setDeckId]   = useState(null);
  const [mode,     setMode]     = useState('write');
  const [shuffled, setShuffled] = useState([]);
  const [idx,      setIdx]      = useState(0);
  const [answer,   setAnswer]   = useState('');
  const [choices,  setChoices]  = useState([]);
  const [chosen,   setChosen]   = useState(null);
  const [checked,  setChecked]  = useState(false);
  const [correct,  setCorrect]  = useState(null);
  const [score,    setScore]    = useState({ right: 0, wrong: 0 });

  const inputRef = useRef(null);

  const deck     = deckId ? DECKS.find(d => d.id === deckId) : null;
  const word     = shuffled[idx] || null;
  const progress = shuffled.length > 0 ? (idx / shuffled.length) * 100 : 0;
  const total    = shuffled.length;

  useEffect(() => {
    if (phase === 'drill' && mode === 'choice' && deck && word) {
      setChoices(generateChoices(deck.words, word));
    }
  }, [idx, mode, phase, deckId]);

  useEffect(() => {
    if (phase === 'drill' && mode === 'write' && !checked) {
      setTimeout(() => inputRef.current?.focus(), 90);
    }
  }, [idx, mode, phase, checked]);

  const startDeck = (id) => {
    const d  = DECKS.find(x => x.id === id);
    const sh = shuffle(d.words);
    setDeckId(id);
    setShuffled(sh);
    setIdx(0);
    setAnswer('');
    setChosen(null);
    setChecked(false);
    setCorrect(null);
    setScore({ right: 0, wrong: 0 });
    setPhase('drill');
  };

  const switchMode = (m) => {
    if (m === mode) return;
    setMode(m);
    setAnswer('');
    setChosen(null);
    setChecked(false);
    setCorrect(null);
  };

  const handleCheck = () => {
    if (!word || checked) return;
    const ok = checkAnswer(answer, word);
    setChecked(true);
    setCorrect(ok);
    setScore(s => ({ right: s.right + (ok ? 1 : 0), wrong: s.wrong + (ok ? 0 : 1) }));
  };

  const handleChoiceSelect = (i) => {
    if (checked || !word) return;
    const ok = choices[i].es === word.es;
    setChosen(i);
    setChecked(true);
    setCorrect(ok);
    setScore(s => ({ right: s.right + (ok ? 1 : 0), wrong: s.wrong + (ok ? 0 : 1) }));
  };

  const handleNext = () => {
    if (idx < shuffled.length - 1) {
      setIdx(i => i + 1);
      setAnswer('');
      setChosen(null);
      setChecked(false);
      setCorrect(null);
    } else {
      setPhase('results');
    }
  };

  const handleRetry = () => startDeck(deckId);

  const handleBack = () => {
    setPhase('select');
    setDeckId(null);
    setShuffled([]);
  };

  const insertAccent = (char) => {
    const el = inputRef.current;
    if (!el) return;
    const s = el.selectionStart, e = el.selectionEnd;
    setAnswer(answer.slice(0, s) + char + answer.slice(e));
    setTimeout(() => { el.focus(); el.setSelectionRange(s + 1, s + 1); }, 0);
  };

  const pct = total > 0 ? Math.round((score.right / total) * 100) : 0;

  return (
    <Layout title="Glosdrilla — Om Spanska" description="Öva spanska glosor">
      <div className={styles.page}>

        <header className={styles.header}>
          <span className={styles.eyebrow}>Övning</span>
          <h1 className={styles.title}>Glosdrilla</h1>
          <p className={styles.desc}>
            Välj en kortlek och öva glosor — skriv svaret eller välj bland fyra alternativ.
          </p>
        </header>

        <div className={styles.rule} />

        {/* ══ SELECT ══════════════════════════════════════════════════════════ */}
        {phase === 'select' && (
          <div className={styles.selectPhase}>
            <div className={styles.deckGrid}>
              {DECKS.map(d => (
                <DeckCard key={d.id} deck={d} onStart={() => startDeck(d.id)} />
              ))}
            </div>
          </div>
        )}

        {/* ══ DRILL ═══════════════════════════════════════════════════════════ */}
        {phase === 'drill' && word && (
          <div className={styles.drillPhase}>

            <div className={styles.drillHeader}>
              <button className={styles.backBtn} onClick={handleBack}>← Kortlekar</button>
              <div className={styles.modeToggle}>
                <button className={`${styles.modeBtn} ${mode === 'write'  ? styles.modeBtnActive : ''}`} onClick={() => switchMode('write')}>Skriv</button>
                <button className={`${styles.modeBtn} ${mode === 'choice' ? styles.modeBtnActive : ''}`} onClick={() => switchMode('choice')}>Flerval</button>
              </div>
              <span className={styles.progressLabel}>{idx + 1} / {total}</span>
            </div>

            <div className={styles.progressBarOuter}>
              <div className={styles.progressBarFill} style={{ width: `${progress}%` }} />
            </div>

            <div className={styles.wordCard}>
              <p className={styles.wordSv}>{word.sv}</p>
              <div className={styles.wordMeta}>
                <span className={styles.wordType}>{typeDisplay(word)}</span>
                {word.note && <span className={styles.wordNote}>{word.note}</span>}
              </div>
            </div>

            {/* Write mode */}
            {mode === 'write' && (
              <div className={styles.writeMode}>
                <div className={styles.inputWrap}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); checked ? handleNext() : handleCheck(); }}}
                    className={[styles.writeInput, checked && correct ? styles.writeInputOk : '', checked && !correct ? styles.writeInputErr : ''].filter(Boolean).join(' ')}
                    placeholder="Skriv på spanska…"
                    disabled={checked}
                    spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off"
                  />
                  {checked && !correct && (
                    <p className={styles.correctReveal}>
                      <span className={styles.correctRevealLabel}>Rätt svar:</span>{' '}{displayAnswer(word)}
                    </p>
                  )}
                  {checked && correct && (
                    <p className={styles.correctFeedback}>✓ Rätt! {displayAnswer(word)}</p>
                  )}
                </div>
                {!checked && (
                  <div className={styles.accentRow}>
                    {ACCENT_CHARS.map(c => (
                      <button key={c} className={styles.accentBtn} tabIndex={-1}
                        onMouseDown={e => { e.preventDefault(); insertAccent(c); }}>{c}</button>
                    ))}
                  </div>
                )}
                <div className={styles.actions}>
                  {!checked
                    ? <button className={styles.primaryBtn} onClick={handleCheck}>Kontrollera</button>
                    : <button className={styles.primaryBtn} onClick={handleNext}>{idx < total - 1 ? 'Nästa →' : 'Se resultat →'}</button>
                  }
                </div>
              </div>
            )}

            {/* Choice mode */}
            {mode === 'choice' && choices.length === 4 && (
              <div className={styles.choiceMode}>
                <div className={styles.choiceGrid}>
                  {choices.map((c, i) => {
                    const isCorrectChoice = c.es === word.es;
                    const isChosen = chosen === i;
                    let cls = styles.choiceBtn;
                    if (checked) {
                      if (isCorrectChoice) cls += ' ' + styles.choiceBtnCorrect;
                      else if (isChosen)   cls += ' ' + styles.choiceBtnWrong;
                      else                 cls += ' ' + styles.choiceBtnDim;
                    } else if (isChosen) {
                      cls += ' ' + styles.choiceBtnSelected;
                    }
                    return (
                      <button key={i} className={cls} onClick={() => handleChoiceSelect(i)} disabled={checked}>
                        {displayAnswer(c)}
                      </button>
                    );
                  })}
                </div>
                {checked && (
                  <div className={styles.choiceFeedback}>
                    {correct
                      ? <span className={styles.correctFeedback}>✓ Rätt!</span>
                      : <span className={styles.wrongFeedback}>✗ Rätt svar: {displayAnswer(word)}</span>
                    }
                  </div>
                )}
                {checked && (
                  <div className={styles.actions}>
                    <button className={styles.primaryBtn} onClick={handleNext}>
                      {idx < total - 1 ? 'Nästa →' : 'Se resultat →'}
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* ══ RESULTS ═════════════════════════════════════════════════════════ */}
        {phase === 'results' && deck && (
          <div className={styles.resultsPhase}>
            <div className={styles.resultsCard}>
              <p className={styles.resultsDeckLabel}>Kortlek {deck.id} — {deck.theme}</p>
              <div className={styles.resultsScore}>
                <span className={styles.resultsRight}>{score.right}</span>
                <span className={styles.resultsSlash}>/</span>
                <span className={styles.resultsTotal}>{total}</span>
              </div>
              <p className={styles.resultsPct}>{pct} % rätt</p>
              <p className={styles.resultsFeedback}>
                {pct === 100 ? 'Perfekt! 🎉' : pct >= 80 ? 'Imponerande! 💪' : pct >= 60 ? 'Bra jobbat — fortsätt öva!' : 'Försök igen, det löser sig!'}
              </p>
              <div className={styles.resultsBtns}>
                <button className={styles.ghostBtn} onClick={handleBack}>← Välj kortlek</button>
                <button className={styles.primaryBtn} onClick={handleRetry}>Försök igen →</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}
