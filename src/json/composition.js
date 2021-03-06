"use strict";

DAWCore.json.composition = ( env, id ) => {
	const tracks = {},
		sPB = env.def_stepsPerBeat,
		bPM = env.def_beatsPerMeasure;

	for ( let i = 0; i < env.def_nbTracks; ++i ) {
		tracks[ i ] = {};
	}
	return {
		id,
		name: "",
		bpm: env.def_bpm,
		stepsPerBeat: sPB,
		beatsPerMeasure: bPM,
		duration: bPM,
		loopA: false,
		loopB: false,
		synthOpened: "0",
		patternKeysOpened: "0",
		patternDrumsOpened: "1",
		patternBufferOpened: null,
		buffers: {
			0: { type: "audio/wav", duration: .1529, url: "kick-00.wav" },
			1: { type: "audio/wav", duration: .256, url: "clap-00.wav" },
			2: { type: "audio/wav", duration: .0357, url: "hat-00.wav" },
			3: { type: "audio/wav", duration: .1151, url: "snare-00.wav" },
		},
		patterns: {
			0: { order: 0, type: "keys", name: "keys", keys: "0", synth: "0", duration: bPM, },
			1: { order: 0, type: "drums", name: "drums", drums: "0", duration: bPM, },
			2: { order: 0, type: "buffer", dest: "main", buffer: "0", duration: 1, name: "kick" },
			3: { order: 1, type: "buffer", dest: "main", buffer: "1", duration: 1, name: "clap" },
			4: { order: 2, type: "buffer", dest: "main", buffer: "2", duration: 1, name: "hat" },
			5: { order: 3, type: "buffer", dest: "main", buffer: "3", duration: 1, name: "snare" },
		},
		channels: DAWCore.json.channels(),
		tracks,
		blocks: {
			0: { pattern: "0", track: "0", when: 0, duration: bPM },
			1: { pattern: "1", track: "1", when: 0, duration: bPM },
		},
		synths: { 0: DAWCore.json.synth() },
		drumrows: {
			0: { order: 0, pattern: "2", gain: 1, pan: 0 },
			1: { order: 1, pattern: "3", gain: 1, pan: 0 },
			2: { order: 2, pattern: "4", gain: 1, pan: 0 },
			3: { order: 3, pattern: "5", gain: 1, pan: 0 },
		},
		drums: { 0: {} },
		keys: { 0: {} },
	};
};
