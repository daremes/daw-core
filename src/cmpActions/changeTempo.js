"use strict";

DAWCore.actions.changeTempo = ( bpm, bPM, sPB, get ) => {
	const bpmChanged = bpm !== get.bpm(),
		timeSignChanged =
			bPM !== get.beatsPerMeasure() ||
			sPB !== get.stepsPerBeat();

	if ( timeSignChanged || bpmChanged ) {
		const obj = {};

		if ( timeSignChanged ) {
			obj.beatsPerMeasure = bPM;
			obj.stepsPerBeat = sPB;
		}
		if ( bpmChanged ) {
			const objPatterns = {};

			obj.bpm = bpm;
			Object.entries( get.patterns() ).forEach( ( [ id, pat ] ) => {
				if ( pat.type === "buffer" ) {
					const buf = get.buffer( pat.buffer ),
						duration = Math.ceil( buf.duration * ( bpm / 60 ) );

					if ( duration !== pat.duration ) {
						objPatterns[ id ] = { duration };
					}
				}
			} );
			if ( GSUtils.isntEmpty( objPatterns ) ) {
				const objBlocks = {};

				obj.patterns = objPatterns;
				Object.entries( get.blocks() ).forEach( ( [ id, blc ] ) => {
					const pat = objPatterns[ blc.pattern ];

					if ( pat && !blc.durationEdited ) {
						objBlocks[ id ] = { duration: pat.duration };
					}
				} );
				if ( GSUtils.isntEmpty( objBlocks ) ) {
					const cmpDur = DAWCore.common.calcNewDuration( objPatterns, get );

					obj.blocks = objBlocks;
					if ( cmpDur !== get.duration() ) {
						obj.duration = cmpDur;
					}
				}
			}
		}
		return [
			obj,
			[ "cmp", "changeTempo", bpm, bPM, sPB ],
		];
	}
};
